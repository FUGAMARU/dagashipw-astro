import { lazy, Suspense } from "react"

import { isServerSide } from "@/utils"

import type { ImageCore } from "@/components/parts/image/ImageCore"
import type { ComponentProps } from "react"

/** Props */
type Props = ComponentProps<typeof ImageCore>

/**
 * 画像表示用コンポーネント
 * 軽量化画像の参照用に署名されたURLを生成する必要があり、鍵情報を扱うため必ずサーバーサイドでURLを生成する必要がある
 * かつ、サーバーサイドでURL署名に使用するnode:cryptoをクライアントサイドで読み込もうとしてしまうとエラーになるのでまずこのコンポーネントで動的インポートすることによってエラーにならないようにしている
 * ただ画像の表示自体は1つのコンポーネントでスタイリングやPropsを共通化したいので Image -> (ImageOnlyServer | ImageOnlyClient) -> ImageCore という風にコンポーネントを参照している
 * Image: サーバーサイドでコンポーネントを呼んでいるのかクライアントサイドでコンポーネントを呼んでいるのかを判定して適切なコンポーネントを動的インポートする
 * ImageOnlyServer: サーバーサイドで署名されたURLを生成してsrcに埋め込む
 * ImageOnlyClient: 自己ホストしている署名済みURL生成用APIを叩いて結果をsrcに埋め込む
 * ImageCore: 画像を表示するための共通コンポーネント
 */
// TODO: SuspenseのUIをどうするか考える
export const Image = (props: Props) => {
  const ImageComponent = lazy(() =>
    isServerSide
      ? import("@/components/parts/image/ImageOnlyServer").then(({ ImageOnlyServer }) => ({
          default: ImageOnlyServer
        }))
      : import("@/components/parts/image/ImageOnlyClient").then(({ ImageOnlyClient }) => ({
          default: ImageOnlyClient
        }))
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ImageComponent {...props} />
    </Suspense>
  )
}
