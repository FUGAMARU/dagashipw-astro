import { spawn } from "node:child_process"
import { createHash } from "node:crypto"
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rename,
  rmdir,
  writeFile
} from "node:fs/promises"
import { createServer } from "node:net"
import { join, relative, resolve, sep } from "node:path"
import { setTimeout as delay } from "node:timers/promises"
import { fileURLToPath, pathToFileURL } from "node:url"

/** ページ単位のVRT設定 */
const config = {
  viewports: [
    { name: "pc", width: 1440, height: 900 },
    { name: "sp", width: 390, height: 844 }
  ],
  search: {
    keyword: "Astro",
    tag: "Astro",
    emptyKeyword: "__vrt_no_matching_article_7f63d8__"
  },
  port: 4322,
  workers: 2,
  timeout: 60_000,
  // pixelmatchの色差の許容値。差分ピクセル数の許容率とは別の設定。
  threshold: 0.1,
  maxDiffPixels: 0,
  openReport: true
}

const root = fileURLToPath(new URL("../", import.meta.url))
const output = join(root, ".vrt")
const reportDirectory = join(output, "report")
const reportPath = join(reportDirectory, "index.html")

let chromium
let pixelmatch
let PNG
let sharp

/**
 * 不足しているnpm依存パッケージをインストールする
 *
 * @param root - プロジェクトのルートディレクトリ
 * @param [options] - セットアップ設定
 * @param [options.run] - コマンド実行関数
 */
const ensureDependencies = async (root, { run = runCommand } = {}) => {
  const manifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"))
  const lock = JSON.parse(await readFile(join(root, "package-lock.json"), "utf8"))
  const names = Object.keys({ ...manifest.dependencies, ...manifest.devDependencies })
  const installed = await Promise.all(
    names.map(async name => {
      try {
        const dependency = JSON.parse(
          await readFile(join(root, "node_modules", name, "package.json"), "utf8")
        )

        return dependency.version === lock.packages[`node_modules/${name}`]?.version
      } catch {
        return false
      }
    })
  )

  if (installed.every(Boolean)) {
    return
  }

  console.log("VRTに必要なnpm依存をインストールします。")

  const args = ["install", "--include=dev", "--no-audit", "--no-fund"]
  const npm = process.env.npm_execpath
    ? { command: process.execPath, args: [process.env.npm_execpath, ...args] }
    : { command: process.platform === "win32" ? "npm.cmd" : "npm", args }

  await run(npm.command, npm.args, root)
}

/**
 * Chromiumを起動する
 *
 * @param chromium - PlaywrightのChromiumランチャー
 * @param root - プロジェクトのルートディレクトリ
 * @param [options] - セットアップ設定
 * @param [options.run] - コマンド実行関数
 * @returns 起動したブラウザー
 */
const launchChromium = async (chromium, root, { run = runCommand } = {}) => {
  const attempted = new Set()

  for (;;) {
    try {
      return await chromium.launch()
    } catch (error) {
      const message = String(error.message)
      const setup = [
        {
          type: "browser",
          pattern: /Executable doesn't exist/,
          message: "VRT用のChromiumをインストールします。",
          args: ["install", "--only-shell", "--no-remove", "chromium"]
        },
        {
          type: "system",
          pattern:
            /Host system is missing dependencies|error while loading shared libraries|cannot open shared object file|Missing libraries:/i,
          message:
            "ChromiumのOS依存をインストールします（Linuxではsudo入力が必要な場合があります）。",
          args: ["install-deps", "chromium"]
        }
      ].find(({ pattern }) => pattern.test(message))

      if (!setup || attempted.has(setup.type)) {
        throw error
      }

      attempted.add(setup.type)
      console.log(setup.message)

      try {
        await run(
          process.execPath,
          [join(root, "node_modules/playwright/cli.js"), ...setup.args],
          root
        )
      } catch (setupError) {
        throw new Error(`VRTの自動セットアップに失敗しました。\n${setupError.message}`)
      }
    }
  }
}

/**
 * コマンドを実行する
 *
 * @param command - 実行するコマンド
 * @param args - コマンドの引数一覧
 * @param cwd - 作業ディレクトリ
 */
const runCommand = async (command, args, cwd) => {
  const child = spawn(command, args, { cwd, stdio: "inherit", env: process.env })
  const interrupt = () => child.kill("SIGTERM")

  process.once("SIGINT", interrupt)
  process.once("SIGTERM", interrupt)

  try {
    await new Promise((resolve, reject) => {
      child.once("error", reject)
      child.once("exit", (code, signal) => {
        if (code === 0) {
          resolve()
        } else {
          reject(new Error(`${command} ${args.join(" ")} が失敗しました (${signal ?? code})`))
        }
      })
    })
  } finally {
    process.removeListener("SIGINT", interrupt)
    process.removeListener("SIGTERM", interrupt)
  }
}

/**
 * ポートの空きを確認する
 *
 * @param port - 確認するポート番号
 */
const assertPortAvailable = async port => {
  const probe = createServer()

  await new Promise((resolve, reject) => {
    probe.once("error", () =>
      reject(new Error(`VRT用ポート ${port} が使用中です。scripts/vrt.mjs冒頭で変更してください。`))
    )
    probe.listen(port, "127.0.0.1", () => probe.close(resolve))
  })
}

/**
 * 本番ビルドをローカルサーバーで起動する
 *
 * @param root - プロジェクトのルートディレクトリ
 * @param port - 起動するポート番号
 * @param timeout - 起動待ちのタイムアウト時間 (ミリ秒)
 * @returns サーバーのURLと停止関数
 */
const startServer = async (root, port, timeout) => {
  await assertPortAvailable(port)

  const child = spawn(process.execPath, ["dist/server/entry.mjs"], {
    cwd: root,
    env: { ...process.env, HOST: "127.0.0.1", PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"]
  })
  let startupError
  let stderr = ""

  child.on("error", error => {
    startupError = error
  })
  child.stdout.resume()
  child.stderr.on("data", chunk => {
    stderr = `${stderr}${chunk}`.slice(-3000)
  })

  const stop = async () => {
    if (child.exitCode !== null || child.signalCode !== null) {
      return
    }

    const stopped = new Promise(resolve => child.once("exit", resolve))

    child.kill("SIGTERM")

    const force = setTimeout(() => child.kill("SIGKILL"), 5000)

    force.unref()
    await stopped
    clearTimeout(force)
  }
  const baseURL = `http://127.0.0.1:${port}`

  try {
    const started = Date.now()

    while (Date.now() - started < timeout) {
      if (startupError || child.exitCode !== null) {
        throw new Error(
          `本番サーバーの起動に失敗しました。${startupError?.message ?? ""}\n${stderr}`
        )
      }

      try {
        // SSR検索や記事APIの状態に依存しない静的なエラーページで起動確認する。
        const response = await fetch(`${baseURL}/404`, { signal: AbortSignal.timeout(1000) })

        await response.body?.cancel()

        if (response.status === 200 || response.status === 404) {
          return { baseURL, stop }
        }
      } catch {
        // 起動待ちの間だけ接続失敗を再試行する。
      }

      await delay(100)
    }

    throw new Error(`本番サーバーの起動待ちがタイムアウトしました。\n${stderr}`)
  } catch (error) {
    await stop()
    throw error
  }
}

/**
 * HTMLファイルを再帰的に取得する
 *
 * @param directory - 検索対象のディレクトリ
 * @returns HTMLファイルのパス一覧
 */
const htmlFiles = async directory => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(entry => {
      const path = join(directory, entry.name)

      if (entry.isDirectory()) {
        return htmlFiles(path)
      }

      return entry.isFile() && entry.name.endsWith(".html") ? [path] : []
    })
  )

  return files.flat()
}

/**
 * ビルド済みHTMLのパスをページURLに変換する
 *
 * @param path - ビルド出力からの相対パス
 * @returns ページURL
 */
const htmlPathToRoute = path => {
  const route = path.replaceAll(sep, "/").replace(/(^|\/)index\.html$/, "$1")

  return `/${route.split("/").map(encodeURIComponent).join("/")}`.replace(/\/$/, "") || "/"
}

/**
 * 検索結果のページ数を取得する
 *
 * @param type - 検索種別 (keywordまたはtag)
 * @param value - 検索条件
 * @param env - API接続用の環境変数
 * @returns 検索結果のページ数 (最小1ページ)
 */
const searchPageCount = async (type, value, env) => {
  if (!env.API_ORIGIN || !env.API_TOKEN) {
    throw new Error(
      "検索URLの収集にはAPI_ORIGINとAPI_TOKENが必要です。環境変数を確認してください。"
    )
  }

  const query = new URLSearchParams({ [type]: value, "pagination[pageSize]": "10" })
  const url = new URL(
    `${env.API_ORIGIN.replace(/\/$/, "")}/calculated-api/articles/search/${type}?${query}`
  )
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${env.API_TOKEN}` },
    signal: AbortSignal.timeout(30_000)
  })

  if (!response.ok) {
    throw new Error(`検索URLの収集に失敗しました (${type}: HTTP ${response.status})`)
  }

  const body = await response.json()
  const count = body.meta?.pagination?.pageCount

  if (!Number.isInteger(count) || count < 0) {
    throw new Error(`検索APIのページ数が不正です (${type})`)
  }

  return Math.max(1, count)
}

/**
 * 撮影対象のページURLを取得する
 *
 * @param clientDirectory - ビルド済みHTMLのディレクトリ
 * @param search - 検索条件
 * @param [env] - API接続用の環境変数
 * @returns ページURL一覧
 */
const discoverRoutes = async (clientDirectory, search, env = process.env) => {
  const paths = await htmlFiles(clientDirectory)
  const routes = new Set(paths.map(path => htmlPathToRoute(relative(clientDirectory, path))))

  if (!routes.has("/")) {
    throw new Error("ビルド済みトップページがありません。dist/clientを確認してください。")
  }

  const conditions = [
    ["keyword", search.keyword],
    ["tag", search.tag],
    ["keyword", search.emptyKeyword]
  ]
  const invalidCondition = conditions.find(([, value]) => !value?.trim())

  if (invalidCondition) {
    throw new Error(`scripts/vrt.mjs冒頭の検索条件が空です (${invalidCondition[0]})`)
  }

  const searchRoutes = await Promise.all(
    conditions.map(async ([type, value]) => {
      const count = await searchPageCount(type, value, env)

      return Array.from({ length: count }, (_, index) => {
        const query = new URLSearchParams({
          [type]: value,
          ...(index > 0 ? { page: String(index + 1) } : {})
        })

        return `/search?${query}`
      })
    })
  )

  return [...new Set([...routes, ...searchRoutes.flat()])].sort()
}

/**
 * 指定したサイズまで画像に余白を追加する
 *
 * @param image - PNG画像
 * @param width - 余白追加後の幅
 * @param height - 余白追加後の高さ
 * @returns 余白を追加したPNG画像
 */
const pad = (image, width, height) => {
  if (image.width === width && image.height === height) {
    return image
  }

  const padded = new PNG({ width, height })

  padded.data.fill(255)
  PNG.bitblt(image, padded, 0, 0, image.width, image.height, 0, 0)

  return padded
}

/**
 * BeforeとAfterの画像を比較する
 *
 * @param beforeBuffer - Before画像のPNGデーター
 * @param afterBuffer - After画像のPNGデーター
 * @param options - 画像比較設定
 * @returns 比較結果と差分画像
 */
const compareImages = (beforeBuffer, afterBuffer, options) => {
  const before = PNG.sync.read(beforeBuffer)
  const after = PNG.sync.read(afterBuffer)
  const width = Math.max(before.width, after.width)
  const height = Math.max(before.height, after.height)
  const diff = options.createDiff === false ? null : new PNG({ width, height })
  const pixels = pixelmatch(
    pad(before, width, height).data,
    pad(after, width, height).data,
    diff?.data ?? null,
    width,
    height,
    { threshold: options.threshold, includeAA: false }
  )
  const sizeChanged = before.width !== after.width || before.height !== after.height

  return {
    status: sizeChanged || pixels > options.maxDiffPixels ? "changed" : "passed",
    pixels,
    ratio: pixels / (width * height),
    sizeChanged,
    beforeSize: `${before.width} × ${before.height}`,
    afterSize: `${after.width} × ${after.height}`,
    diff: diff ? PNG.sync.write(diff) : null
  }
}

const screenshotStyle = `
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    caret-color: transparent !important;
    scroll-behavior: auto !important;
  }

  .adsbygoogle[data-vrt-ad] {
    display: grid !important;
    place-items: center;
    height: 250px !important;
    min-height: 250px !important;
    max-height: 250px !important;
    overflow: hidden;
    font: 14px sans-serif;
    color: #475569;
    text-decoration: none;
    background: #e5e7eb;
    border: 1px solid #cbd5e1;
  }
`

const iframePlaceholder = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<style>html,body{margin:0;width:100%;height:100%;background:#e5e7eb;color:#475569}
body{display:grid;place-items:center;font:14px sans-serif;box-sizing:border-box;border:1px solid #cbd5e1}
</style></head><body>iframe</body></html>`

/**
 * VRT用の表示状態とプレースホルダーを設定する
 *
 * @param html - プレースホルダーのHTML
 */
const installPlaceholders = html => {
  // 広告スクリプトを実行しなくても既存のpush処理が動くようにする
  window.adsbygoogle = []

  const visit = root => {
    root.querySelectorAll(".adsbygoogle[data-ad-slot]").forEach(ad => {
      ad.setAttribute("data-vrt-ad", "")

      if (ad.childElementCount > 0 || ad.textContent !== "広告") {
        ad.replaceChildren(document.createTextNode("広告"))
      }
    })

    for (const frame of root.querySelectorAll("iframe")) {
      if (frame.srcdoc !== html) {
        frame.srcdoc = html
      }
    }

    for (const element of root.querySelectorAll("*")) {
      if (element.shadowRoot) {
        visit(element.shadowRoot)
      }
    }
  }
  const observer = new MutationObserver(() => visit(document))

  observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "srcdoc"]
  })
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      document.documentElement.setAttribute("data-vrt", "")
      visit(document)
    },
    { once: true }
  )
}

/**
 * 撮影前の描画完了を待つ
 *
 * @param page - 撮影対象のページ
 * @param pending - 処理中のローカルAPIリクエスト
 * @param failures - ローカルAPI通信のエラー一覧
 * @param timeout - 描画待ちのタイムアウト時間 (ミリ秒)
 */
const preparePage = async (page, pending, failures, timeout) => {
  await page.addStyleTag({ content: screenshotStyle })
  await page.waitForFunction(() => document.fonts.status === "loaded", null, { timeout })
  await page.evaluate(() => {
    for (const image of document.querySelectorAll("img")) {
      image.loading = "eager"
    }
  })

  // IntersectionObserverによる遅延表示も、ページの最後まで順に発火させる。
  for (let step = 0; step < 500; step += 1) {
    const bottom = await page.evaluate(() => {
      window.scrollBy(0, Math.max(1, window.innerHeight * 0.8))

      return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1
    })

    await page.waitForTimeout(40)

    if (bottom) {
      break
    }

    if (step === 499) {
      throw new Error(
        "ページ末尾までスクロールできませんでした。無限スクロールを確認してください。"
      )
    }
  }

  await page.waitForFunction(
    () =>
      [...document.querySelectorAll("astro-island[ssr]")].every(island => {
        // client:visibleはスクロールで発火する。レスポンシブCSSで非表示のものは待たない。
        if (island.getAttribute("client") !== "visible") {
          return false
        }

        return ![island, ...island.querySelectorAll("*")].some(element =>
          [...element.getClientRects()].some(rect => rect.width > 0 && rect.height > 0)
        )
      }),
    null,
    { timeout }
  )

  const started = Date.now()
  let quietSince = Date.now()

  while (Date.now() - quietSince < 500) {
    if (pending.size > 0) {
      quietSince = Date.now()
    }

    if (Date.now() - started > timeout) {
      throw new Error("ローカルAPI通信の完了待ちがタイムアウトしました。")
    }

    await page.waitForTimeout(50)
  }

  if (failures.length > 0) {
    throw new Error(`ローカルAPI通信に失敗しました: ${failures.join(", ")}`)
  }

  await page.waitForFunction(
    () => [...document.images].every(image => image.complete) && document.fonts.status === "loaded",
    null,
    { timeout }
  )

  const brokenImages = await page.evaluate(() =>
    [...document.images]
      .filter(image => image.currentSrc && image.naturalWidth === 0)
      .map(image => new URL(image.currentSrc).pathname)
  )

  if (brokenImages.length > 0) {
    throw new Error(`画像の読み込みに失敗しました: ${brokenImages.slice(0, 5).join(", ")}`)
  }

  // 記事のビルド日時だけ固定し、投稿日や更新日は変更しない
  await page
    .locator("p")
    .filter({
      hasText: /^この記事は \d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2} にビルドされました$/
    })
    .evaluateAll(paragraphs => {
      paragraphs.forEach(paragraph => {
        paragraph.textContent = paragraph.textContent.replace(
          /\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/,
          "2000/01/01 00:00:00"
        )
      })
    })

  await page.evaluate(() => {
    for (const video of document.querySelectorAll("video")) {
      video.pause()
      video.currentTime = 0
    }

    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(300)
}

/**
 * ページのスクリーンショットを撮影する
 *
 * @param browser - 撮影用ブラウザー
 * @param baseURL - ローカルサーバーのURL
 * @param route - 撮影対象のページURL
 * @param viewport - 撮影時の画面幅設定
 * @param directory - 画像の保存先ディレクトリ
 * @param config - 撮影設定
 * @returns 撮影結果
 */
const capturePage = async (browser, baseURL, route, viewport, directory, config) => {
  const id = createHash("sha256").update(`${viewport.name}:${route}`).digest("hex").slice(0, 20)
  const result = {
    id,
    route,
    viewport: viewport.name,
    width: viewport.width,
    height: viewport.height
  }
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    locale: "ja-JP",
    timezoneId: "Asia/Tokyo",
    colorScheme: "light",
    reducedMotion: "reduce",
    serviceWorkers: "block"
  })

  try {
    await context.addInitScript(installPlaceholders, iframePlaceholder)
    await context.route("**/*", async routeHandler => {
      const request = routeHandler.request()
      const url = new URL(request.url())
      const isRelatedArticlesRequest =
        request.method() === "GET" &&
        url.origin === baseURL &&
        /^\/api\/proxy\/articles\/[^/]+\/same-tag\/?$/.test(url.pathname)
      const isAdvertisingScript =
        request.resourceType() === "script" &&
        url.hostname === "pagead2.googlesyndication.com" &&
        url.pathname === "/pagead/js/adsbygoogle.js"

      if (isRelatedArticlesRequest) {
        // 関連記事を既存のスケルトン表示に固定する
        await routeHandler.fulfill({ status: 200, contentType: "application/json", body: "[]" })
      } else if (isAdvertisingScript) {
        await routeHandler.fulfill({ status: 200, contentType: "application/javascript", body: "" })
      } else if (request.isNavigationRequest() && request.frame().parentFrame() !== null) {
        await routeHandler.fulfill({ contentType: "text/html", body: iframePlaceholder })
      } else if (request.resourceType() === "image") {
        try {
          const response = await routeHandler.fetch({ timeout: config.timeout })
          const type = response.headers()["content-type"] ?? ""

          if (response.ok() && /image\/(gif|webp|avif|png)/i.test(type)) {
            const body = await response.body()
            const metadata = await sharp(body).metadata()

            if (metadata.pages > 1) {
              const still = await sharp(body, { page: 0, pages: 1 }).png().toBuffer()
              const headers = { ...response.headers(), "content-type": "image/png" }

              delete headers["content-length"]
              delete headers["content-encoding"]
              await routeHandler.fulfill({ response, headers, body: still })

              return
            }
          }

          await routeHandler.fulfill({ response })
        } catch {
          // 通信・デコードの失敗を画像読み込みエラーとしてページ単位で報告する。
          await routeHandler.abort("failed").catch(() => {})
        }
      } else {
        await routeHandler.continue()
      }
    })

    const page = await context.newPage()

    page.setDefaultTimeout(config.timeout)

    const pending = new Set()
    const failures = []
    const track = request =>
      ["fetch", "xhr"].includes(request.resourceType()) && new URL(request.url()).origin === baseURL

    page.on("request", request => {
      if (track(request)) {
        pending.add(request)
      }
    })
    page.on("requestfinished", request => pending.delete(request))
    page.on("requestfailed", request => {
      pending.delete(request)

      if (track(request)) {
        failures.push(new URL(request.url()).pathname)
      }
    })
    page.on("response", response => {
      if (track(response.request()) && response.status() >= 400) {
        failures.push(`${new URL(response.url()).pathname} (${response.status()})`)
      }
    })

    const response = await page.goto(`${baseURL}${route}`, { waitUntil: "domcontentloaded" })
    // エラーページはビルド済みHTMLの表示自体を確認する。
    const errorStatus = route.match(/^\/(404|500)(?:\.html)?$/)?.[1]
    const expectedStatus = errorStatus ? Number(errorStatus) : 200

    if (!response || (response.status() !== 200 && response.status() !== expectedStatus)) {
      throw new Error(`HTTP ${response?.status() ?? "応答なし"}`)
    }

    const expectedURL = new URL(route, baseURL)

    if (page.url() !== expectedURL.href && page.url() !== `${expectedURL.href}/`) {
      throw new Error(`予期しないリダイレクト: ${new URL(page.url()).pathname}`)
    }

    await preparePage(page, pending, failures, config.timeout)

    const screenshotOptions = {
      fullPage: true,
      animations: "disabled",
      caret: "hide",
      style: screenshotStyle,
      timeout: config.timeout
    }
    let previous = await page.screenshot(screenshotOptions)
    let stable = false

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await page.waitForTimeout(200)

      const current = await page.screenshot(screenshotOptions)

      if (
        current.equals(previous) ||
        compareImages(previous, current, {
          threshold: config.threshold,
          maxDiffPixels: 0,
          createDiff: false
        }).status === "passed"
      ) {
        previous = current
        stable = true
        break
      }

      previous = current
    }

    if (!stable) {
      throw new Error("描画が安定しません。動画や動的表示を確認してください。")
    }

    await mkdir(directory, { recursive: true })

    const image = `${id}.png`

    await writeFile(join(directory, image), previous)

    return { ...result, image }
  } catch (error) {
    return { ...result, error: error.message }
  } finally {
    await context.close()
  }
}

/**
 * 並列数を制限して一覧を変換する
 *
 * @param items - 処理対象の一覧
 * @param transform - 各項目を変換する関数
 * @param concurrency - 同時実行数
 * @returns 元の順序を維持した処理結果一覧
 */
const mapWithConcurrency = async (items, transform, concurrency) => {
  const entries = items.entries()
  const results = new Array(items.length)
  const worker = async () => {
    for (const [index, item] of entries) {
      results[index] = await transform(item, index)
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker))

  return results
}

/**
 * 全ページのスクリーンショットを撮影する
 *
 * @param browser - 撮影用ブラウザー
 * @param baseURL - ローカルサーバーのURL
 * @param routes - 撮影対象のページURL一覧
 * @param directory - 画像の保存先ディレクトリ
 * @param config - 撮影設定
 * @returns 全ページの撮影結果
 */
const captureAll = async (browser, baseURL, routes, directory, config) => {
  const tasks = routes.flatMap(route => config.viewports.map(viewport => ({ route, viewport })))
  const capture = async ({ route, viewport }, index) => {
    const result = await capturePage(browser, baseURL, route, viewport, directory, config)

    console.log(
      `[${index + 1}/${tasks.length}] ${viewport.name} ${route} ${result.error ? `ERROR: ${result.error}` : "OK"}`
    )

    return result
  }

  return mapWithConcurrency(tasks, capture, config.workers)
}

const labels = {
  passed: "一致",
  changed: "差分あり",
  added: "新規ページ",
  removed: "削除ページ",
  error: "エラー"
}

/**
 * HTMLの特殊文字をエスケープする
 *
 * @param value - エスケープする値
 * @returns エスケープ後の文字列
 */
const escape = value =>
  String(value ?? "").replace(
    /[&<>"']/g,
    character =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]
  )

/**
 * 撮影画像をレポート用ディレクトリにコピーする
 *
 * @param record - 撮影結果
 * @param source - 撮影画像の保存元ディレクトリ
 * @param kind - 画像種別 (beforeまたはafter)
 * @param directory - レポートの保存先ディレクトリ
 * @returns レポート内の画像パス (画像がない場合はnull)
 */
const copyImage = async (record, source, kind, directory) => {
  if (!record?.image) {
    return null
  }

  const name = `images/${record.id}-${kind}.png`

  await copyFile(join(source, record.image), join(directory, name))

  return name
}

/**
 * BeforeとAfterの撮影結果を比較する
 *
 * @param before - Beforeの撮影結果
 * @param after - Afterの撮影結果
 * @param beforeDirectory - Before画像の保存先ディレクトリ
 * @param afterDirectory - After画像の保存先ディレクトリ
 * @param reportDirectory - レポートの保存先ディレクトリ
 * @param options - 画像比較設定
 * @returns ページごとの比較結果一覧
 */
const createComparisons = async (
  before,
  after,
  beforeDirectory,
  afterDirectory,
  reportDirectory,
  options
) => {
  await mkdir(join(reportDirectory, "images"), { recursive: true })

  const oldRecords = new Map(before.results.map(record => [record.id, record]))
  const newRecords = new Map(after.results.map(record => [record.id, record]))
  const ids = [...new Set([...oldRecords.keys(), ...newRecords.keys()])]
  const compareRecord = async id => {
    const oldRecord = oldRecords.get(id)
    const newRecord = newRecords.get(id)
    const record = newRecord ?? oldRecord
    const copies = await Promise.allSettled([
      copyImage(oldRecord, beforeDirectory, "before", reportDirectory),
      copyImage(newRecord, afterDirectory, "after", reportDirectory)
    ])

    const [beforeImage, afterImage] = copies.map(copy =>
      copy.status === "fulfilled" ? copy.value : null
    )
    const result = { ...record, before: beforeImage, after: afterImage }
    const copyErrors = copies
      .filter(copy => copy.status === "rejected")
      .map(copy => copy.reason.message)

    if (copyErrors.length > 0) {
      return { ...result, status: "error", error: copyErrors.join(" / ") }
    }

    try {
      const errors = [
        oldRecord?.error && `Before: ${oldRecord.error}`,
        newRecord?.error && `After: ${newRecord.error}`
      ].filter(Boolean)

      if (errors.length > 0) {
        return { ...result, status: "error", error: errors.join(" / ") }
      }

      if (!oldRecord || !newRecord) {
        return { ...result, status: oldRecord ? "removed" : "added" }
      }

      const buffers = await Promise.all([
        readFile(join(beforeDirectory, oldRecord.image)),
        readFile(join(afterDirectory, newRecord.image))
      ])
      const { diff, ...comparison } = compareImages(...buffers, options)

      if (comparison.status !== "changed") {
        return { ...result, ...comparison }
      }

      const diffImage = `images/${id}-diff.png`

      await writeFile(join(reportDirectory, diffImage), diff)

      return { ...result, ...comparison, diff: diffImage }
    } catch (error) {
      return { ...result, status: "error", error: error.message }
    }
  }

  // 長いページのPNGを一度に展開しないよう、画像比較は1件ずつ実行する
  return mapWithConcurrency(ids, compareRecord, 1)
}

/**
 * HTMLレポートを生成する
 *
 * @param directory - レポートの保存先ディレクトリ
 * @param results - 撮影または比較の結果一覧
 * @param metadata - 撮影日時と実行環境の情報
 * @param [problem] - 実行エラーのメッセージ
 * @returns ステータスごとの件数
 */
const writeReport = async (directory, results, metadata, problem = "") => {
  await mkdir(directory, { recursive: true })

  const counts = Object.fromEntries(
    Object.keys(labels).map(status => [
      status,
      results.filter(result => result.status === status).length
    ])
  )
  const image = (label, source) =>
    `<figure><figcaption>${label}</figcaption>${source ? `<div class="image"><a href="${escape(source)}" target="_blank" rel="noopener"><img src="${escape(source)}" loading="lazy" alt="${label}"></a></div>` : '<p class="missing">画像なし</p>'}</figure>`
  const cards = results
    .map(
      result => `<details class="case" data-status="${result.status}" data-viewport="${escape(result.viewport)}" data-route="${escape(result.route)}" ${["changed", "error", "added", "removed"].includes(result.status) ? "open" : ""}>
    <summary><span class="badge ${result.status}">${labels[result.status]}</span><span>${escape(result.route)}</span><small>${escape(result.viewport)} · ${result.width} × ${result.height}</small></summary>
    ${result.error ? `<p class="error-message">${escape(result.error)}</p>` : ""}
    ${result.pixels !== undefined ? `<p class="metrics">差分 ${result.pixels.toLocaleString()} px (${(result.ratio * 100).toFixed(4)}%) · Before ${escape(result.beforeSize)} → After ${escape(result.afterSize)}${result.sizeChanged ? " · 画像サイズ変更" : ""}</p>` : ""}
    <div class="images">${image("Before", result.before)}${image("After", result.after)}${image("Diff", result.diff)}</div>
  </details>`
    )
    .join("\n")
  const html = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ページVRTレポート</title>
<style>
*{box-sizing:border-box}body{margin:0;padding:24px;background:#f1f5f9;color:#0f172a;font:15px/1.6 system-ui,sans-serif}main{max-width:1600px;margin:auto}h1{margin:0 0 8px;font-size:26px}.meta,.metrics{color:#475569;font-size:13px}.counts,.filters{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0}.counts span,select,input{background:white;border:1px solid #cbd5e1;border-radius:6px;padding:8px 12px}input{min-width:260px}.case{background:white;border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;overflow:hidden}.case[hidden]{display:none}summary{cursor:pointer;padding:14px;overflow-wrap:anywhere}summary small{margin-left:16px;color:#475569}.badge{display:inline-block;border-radius:4px;padding:2px 8px;margin-right:12px;background:#e2e8f0;font-size:12px}.changed,.removed{background:#ffedd5;color:#9a3412}.error{background:#fee2e2;color:#991b1b}.passed{background:#dcfce7;color:#166534}.added,.before{background:#dbeafe;color:#1e40af}.metrics,.error-message{margin:12px 16px}.error-message{color:#991b1b;white-space:pre-wrap;overflow-wrap:anywhere}.images{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;padding:16px}figure{margin:0;min-width:0}figcaption{font-weight:600;margin-bottom:8px}.image{max-height:700px;overflow:auto;background:#e2e8f0;border:1px solid #cbd5e1}.image img{display:block;width:100%;height:auto}.missing{color:#64748b}a{color:inherit}@media(max-width:700px){body{padding:12px}.images{grid-template-columns:1fr}summary small{display:block;margin:8px 0}}
select {
  appearance: none;
  padding-right: 40px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23475569' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px 16px;
}
</style></head><body><main><h1>ページVRTレポート</h1>
<p class="meta">Before: ${escape(metadata.before ?? "未撮影")} / After: ${escape(metadata.after ?? "未撮影")}<br>Chromium ${escape(metadata.browser)} · ${escape(metadata.platform)} · 色差の許容値 ${escape(metadata.threshold)} · 許容差分 ${escape(metadata.maxDiffPixels)} px</p>
${problem ? `<p class="error-message">${escape(problem)}</p>` : ""}
<div class="counts">${Object.entries(labels)
    .filter(([status]) => counts[status] > 0)
    .map(([status, label]) => `<span>${label}: ${counts[status]}</span>`)
    .join("")}<span>合計: ${results.length}</span></div>
<div class="filters"><select id="status" aria-label="結果"><option value="">すべての結果</option>${Object.entries(
    labels
  )
    .map(([status, label]) => `<option value="${status}">${label}</option>`)
    .join(
      ""
    )}</select><select id="viewport" aria-label="画面幅"><option value="">すべての画面幅</option>${[...new Set(results.map(result => result.viewport))].map(viewport => `<option>${escape(viewport)}</option>`).join("")}</select><input id="route" type="search" placeholder="URLで絞り込み" aria-label="URLで絞り込み"></div>
<p class="meta">画像をクリックすると原寸で表示します。APIの内容・日付の変化も差分に含まれます。関連記事・iframe・広告・ビルド日時は固定表示にし、目次のアクティブ状態は解除します。</p>
${cards || "<p>撮影結果がありません。</p>"}
</main><script>
const statusFilter = document.getElementById("status")
const viewportFilter = document.getElementById("viewport")
const routeFilter = document.getElementById("route")
const filter = () => {
  document.querySelectorAll(".case").forEach(card => {
    const statusMismatch = statusFilter.value && card.dataset.status !== statusFilter.value
    const viewportMismatch = viewportFilter.value && card.dataset.viewport !== viewportFilter.value
    const routeMismatch = !card.dataset.route.toLowerCase().includes(routeFilter.value.toLowerCase())
    card.hidden = Boolean(statusMismatch || viewportMismatch || routeMismatch)
  })
}
const filters = [statusFilter, viewportFilter, routeFilter]
filters.forEach(element => element.addEventListener("input", filter))
</script></body></html>`

  await writeFile(join(directory, "index.html"), html)
  await writeFile(
    join(directory, "results.json"),
    JSON.stringify({ metadata, problem, counts, results }, null, 2)
  )

  return counts
}

/**
 * HTMLレポートをブラウザーで開く
 *
 * @param path - HTMLレポートのパス
 */
const openReport = path => {
  console.log(`HTMLレポート: ${path}`)

  if (process.platform === "linux" && !process.env.DISPLAY && !process.env.WAYLAND_DISPLAY) {
    return
  }

  const url = pathToFileURL(path).href
  const command =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
        ? "explorer.exe"
        : "xdg-open"
  const child = spawn(command, [url], { detached: true, stdio: "ignore" })

  child.on("error", () => console.log("ブラウザーで上記のHTMLファイルを開いてください。"))
  child.unref()
}

/**
 * Beforeの撮影条件を検証する
 *
 * @param before - Beforeの撮影結果
 * @param currentConfig - 現在の撮影設定
 * @param browserVersion - 現在のブラウザーバージョン
 */
const validateBefore = (before, currentConfig, browserVersion) => {
  if (before.failed || !before.results?.length) {
    throw new Error(
      "有効なBeforeがありません。エラーを解消してnpm run vrt:beforeを実行してください。"
    )
  }

  if (
    JSON.stringify(before.viewports) !== JSON.stringify(currentConfig.viewports) ||
    JSON.stringify(before.search) !== JSON.stringify(currentConfig.search)
  ) {
    throw new Error(
      "画面幅または検索条件がBeforeから変更されています。Beforeを取り直してください。"
    )
  }

  if (
    before.browser !== browserVersion ||
    before.platform !== `${process.platform}/${process.arch}`
  ) {
    throw new Error(
      "ブラウザーまたはOSがBeforeと異なります。同じ環境でBeforeを取り直してください。"
    )
  }
}

/**
 * Before撮影またはAfter比較を実行する
 *
 * @param mode - 実行モード (beforeまたはafter)
 */
const main = async mode => {
  if (!["before", "after"].includes(mode)) {
    throw new Error("使い方: npm run vrt:before / npm run vrt:after")
  }

  // npm依存が未導入でも起動できるよう、導入後に外部パッケージを読み込む。
  await ensureDependencies(root)

  const [dotenvModule, playwrightModule, pixelmatchModule, pngModule, sharpModule] =
    await Promise.all([
      import("dotenv"),
      import("playwright"),
      import("pixelmatch"),
      import("pngjs"),
      import("sharp")
    ])
  const dotenv = dotenvModule.default

  chromium = playwrightModule.chromium
  pixelmatch = pixelmatchModule.default
  PNG = pngModule.PNG
  sharp = sharpModule.default
  dotenv.config({
    path: [".env.production.local", ".env.local", ".env.production", ".env"].map(path =>
      join(root, path)
    ),
    quiet: true
  })
  config.workers = Number(process.env.VRT_WORKERS ?? config.workers)

  if (
    !Number.isInteger(config.workers) ||
    config.workers < 1 ||
    !Number.isInteger(config.port) ||
    config.port < 1 ||
    config.port > 65535 ||
    !Number.isFinite(config.timeout) ||
    config.timeout <= 0 ||
    !Number.isFinite(config.threshold) ||
    config.threshold < 0 ||
    config.threshold > 1 ||
    !Number.isInteger(config.maxDiffPixels) ||
    config.maxDiffPixels < 0
  ) {
    throw new Error("scripts/vrt.mjs冒頭の数値設定が不正です。")
  }

  if (
    !Array.isArray(config.viewports) ||
    config.viewports.length === 0 ||
    new Set(config.viewports.map(viewport => viewport.name)).size !== config.viewports.length ||
    config.viewports.some(
      viewport =>
        !viewport.name ||
        !Number.isInteger(viewport.width) ||
        viewport.width <= 0 ||
        !Number.isInteger(viewport.height) ||
        viewport.height <= 0
    )
  ) {
    throw new Error("scripts/vrt.mjs冒頭の画面幅設定が不正です。")
  }

  let before

  if (mode === "after") {
    try {
      before = JSON.parse(await readFile(join(output, "before.json"), "utf8"))
    } catch {
      throw new Error("Beforeがありません。変更前にnpm run vrt:beforeを実行してください。")
    }
  }

  await mkdir(join(output, "captures"), { recursive: true })

  const lock = join(output, "run.lock")

  try {
    await mkdir(lock)
  } catch (error) {
    if (error.code === "EEXIST") {
      throw new Error(
        "別のVRTが実行中です。実行中のプロセスがない場合は.vrt/run.lockを削除してください。"
      )
    }

    throw error
  }

  const directory = await mkdtemp(join(output, "captures", `${mode}-`))

  let browser
  let server

  const metadata = {
    before: before?.createdAt,
    browser: before?.browser,
    platform: `${process.platform}/${process.arch}`,
    threshold: config.threshold,
    maxDiffPixels: config.maxDiffPixels
  }
  const stopOnSignal = () => {
    void browser?.close()
    void server?.stop()
    process.exitCode = 130
  }

  process.once("SIGINT", stopOnSignal)
  process.once("SIGTERM", stopOnSignal)

  try {
    if (mode === "before") {
      // 起動・ビルド・URL収集に失敗しても、前回のBeforeで比較させない。
      await writeFile(join(output, "before.json"), JSON.stringify({ failed: true }))
    }

    browser = await launchChromium(chromium, root)
    metadata.browser = browser.version()

    if (before) {
      validateBefore(before, config, browser.version())
    }

    console.log(`${mode === "before" ? "Before" : "After"}用の本番ビルドを作成します。`)
    await runCommand(process.execPath, ["node_modules/astro/bin/astro.mjs", "build"], root)

    const routes = await discoverRoutes(join(root, "dist/client"), config.search)

    console.log(`${routes.length} URL × ${config.viewports.length} 画面幅を撮影します。`)
    server = await startServer(root, config.port, config.timeout)

    const results = await captureAll(browser, server.baseURL, routes, directory, config)

    const manifest = {
      createdAt: new Date().toISOString(),
      browser: browser.version(),
      platform: metadata.platform,
      viewports: config.viewports,
      search: config.search,
      directory,
      routes,
      results
    }

    await writeFile(join(directory, "manifest.json"), JSON.stringify(manifest, null, 2))

    if (mode === "before") {
      // 新しいBeforeに失敗があったとき、古いBeforeで比較を継続しないよう失敗も記録する。
      const temporary = join(output, "before.json.tmp")

      await writeFile(temporary, JSON.stringify(manifest, null, 2))
      await rename(temporary, join(output, "before.json"))

      const errors = results.filter(result => result.error)

      if (errors.length > 0) {
        process.exitCode = 1
        console.error(`Before撮影に${errors.length}件失敗しました。撮影ログを確認してください。`)
      } else {
        console.log("Before撮影完了。コード変更後にnpm run vrt:afterを実行してください。")
      }

      return
    }

    metadata.after = manifest.createdAt

    const reportResults = await createComparisons(
      before,
      manifest,
      before.directory,
      directory,
      reportDirectory,
      config
    )
    const counts = await writeReport(reportDirectory, reportResults, metadata)

    console.log(
      Object.entries(counts)
        .filter(([, count]) => count > 0)
        .map(([status, count]) => `${status}: ${count}`)
        .join(" / ")
    )

    if (["error", "changed", "added", "removed"].some(status => counts[status] > 0)) {
      process.exitCode = 1
    }
  } catch (error) {
    process.exitCode = 1
    console.error(error.message)

    if (mode === "after") {
      await writeReport(reportDirectory, [], metadata, error.message)
    }
  } finally {
    await browser?.close()
    await server?.stop()
    await rmdir(lock)
    process.removeListener("SIGINT", stopOnSignal)
    process.removeListener("SIGTERM", stopOnSignal)

    if (mode === "after") {
      if (config.openReport) {
        openReport(reportPath)
      } else {
        console.log(`HTMLレポート: ${reportPath}`)
      }
    }
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv[2]).catch(error => {
    console.error(error.message)
    process.exitCode = 1
  })
}
