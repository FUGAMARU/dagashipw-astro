import { isValidArray } from "@/utils"

/**
 * マークダウンに目次と広告コンポーネントを挿入する
 *
 * @param markdown - マークダウン
 * @returns 目次・広告挿入後のマークダウン (h2が見つからない場合はそのまま返す)
 */
export const insertTableOfContentsAndAds = (markdown: string): string => {
  const H2_REGEX = /##\s/
  const sections = markdown.split(H2_REGEX)

  // h2が見つからない場合はそのまま返す
  if (sections.length <= 1) {
    return markdown
  }

  const [firstSection, ...h2Sections] = sections
  const middleIndex = Math.floor(h2Sections.length / 2)

  const processedSections = h2Sections.map((section, index) => {
    const isFirstH2 = index === 0
    const isMiddleH2 = index === middleIndex && h2Sections.length > 1

    const inserters = [
      ...(isFirstH2 ? ['<Inserter type="tableOfContents" />', '<Inserter type="adTop" />'] : []),
      ...(isMiddleH2 ? ['<Inserter type="adMiddle" />'] : [])
    ]

    const inserterString = isValidArray(inserters) ? `${inserters.join("\n")}\n\n` : ""
    return `${inserterString}## ${section}`
  })

  return `${firstSection}${processedSections.join("")}`
}
