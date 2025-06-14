/* eslint-disable no-restricted-imports */
/**
 * @file 記事の本文で使用されている文字列を横断的に検索するスクリプト
 */

import { createInterface } from "node:readline"
import { promisify } from "node:util"

import { getAllArticlesBody } from "./utils.js"

/** Main */
const main = async () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const question = promisify(rl.question).bind(rl)
  const searchTargetString = await question("検索する文字列を入力してください > ")

  rl.close()

  console.log("記事の本文を取得しています…\n")

  const articleBodyList = await getAllArticlesBody()

  const searchResult = articleBodyList
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    .filter(article => article.body.includes(searchTargetString))
    .map(article => article.title)

  if (searchResult.length === 0) {
    console.log("該当する記事は存在しませんでした")
    return
  }

  console.log(`${searchResult.length}件の記事に指定されたテキストが含まれていました\n`)
  console.log(searchResult.reduce((acc, elm, idx) => `${acc}${idx + 1}. ${elm}\n`, ""))
}

main()
