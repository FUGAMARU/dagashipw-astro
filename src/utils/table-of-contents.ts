/**
 * @file 目次関連の関数群
 */

import { generateHeadingId } from "@/utils/formatter"
import { isDefined } from "@/utils/isDefined"

import type { NestedHeading, TableOfContentsData } from "@/types/table-of-contents"

/**
 * Markdownから目次データを生成する
 *
 * @param markdown - Markdown
 * @returns 目次データ
 */
export const generateTableOfContentsFromMarkdown = (markdown: string): TableOfContentsData => {
  const lines = markdown.split("\n")
  const data: TableOfContentsData = []

  let currentH2:
    | (NestedHeading & {
        /** h3 */
        h3?: Array<
          NestedHeading & {
            /** h4 */
            h4?: Array<NestedHeading>
          }
        >
      })
    | null = null
  let currentH3:
    | (NestedHeading & {
        /** h4 */
        h4?: Array<NestedHeading>
      })
    | null = null
  let currentH4: NestedHeading | null = null

  lines.forEach(line => {
    const h2Match = line.match(/^## (.+)/)
    const h3Match = line.match(/^### (.+)/)
    const h4Match = line.match(/^#### (.+)/)

    if (isDefined(h2Match)) {
      currentH2 = {
        title: h2Match[1],
        href: `#${generateHeadingId(h2Match[1])}`
      }
      data.push({ h2: currentH2 })
      currentH3 = null
      currentH4 = null
      return
    }
    if (isDefined(h3Match) && isDefined(currentH2)) {
      currentH3 = {
        title: h3Match[1],
        href: `#${generateHeadingId(h3Match[1])}`
      }
      currentH2.h3 = currentH2.h3 ?? []
      currentH2.h3.push(currentH3)
      currentH4 = null
      return
    }
    if (!(isDefined(h4Match) && isDefined(currentH3))) {
      return
    }
    currentH4 = {
      title: h4Match[1],
      href: `#${generateHeadingId(h4Match[1])}`
    }
    currentH3.h4 = currentH3.h4 ?? []
    currentH3.h4.push(currentH4)
  })

  return data
}
