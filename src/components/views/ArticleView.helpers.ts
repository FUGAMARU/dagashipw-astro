import { PAGE_PATH } from "@/constants/page"

/**
 * マークダウンに目次と広告コンポーネントを挿入する
 *
 * @param markdown - マークダウン
 * @param articleUrlId - 記事のURL ID
 * @returns 目次・広告挿入後のマークダウン (h2が見つからない場合はそのまま返す)
 */
export const insertTableOfContentsAndAds = (markdown: string, articleUrlId: string): string => {
  const sections = markdown.split(/\n(?=##\s)/)

  if (sections.length <= 1) {
    return markdown
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const firstSection = sections.shift()!
  const h2Sections = sections

  const topInserterList = [`<Inserter type="tableOfContents" />`]

  if (`/${articleUrlId}` === PAGE_PATH.KAKEI_BOARD_ARTICLE) {
    topInserterList.push(`<Inserter type="adTop" />`)
  } else {
    topInserterList.push(`<Inserter type="kakeiBoardAd" />`)
  }

  h2Sections[0] = `${topInserterList.join("\n")}\n\n${h2Sections[0]}`

  if (h2Sections.length > 1) {
    const middleIndex = Math.floor(h2Sections.length / 2)
    const adMiddle = `<Inserter type="adMiddle" />`
    h2Sections[middleIndex] = `${adMiddle}\n\n${h2Sections[middleIndex]}`
  }

  return [firstSection, ...h2Sections].join("\n")
}
