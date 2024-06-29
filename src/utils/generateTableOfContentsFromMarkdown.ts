import { generateHeadingId } from "@/utils/generateHeadingId"
import { isDefined } from "@/utils/isDefined"

import type TableOfContents from "@/components/templates/TableOfContents"
import type { ComponentProps } from "react"

type Heading = {
  title: string
  href: string
  h3?: Array<Heading>
}

type Data = Array<{
  h2: Heading & {
    h3?: Array<Heading & { h4?: Array<Heading> }>
  }
}>

/**
 * Markdownから目次データを生成する
 * @param markdown - Markdown
 * @returns 目次データ
 */
export const generateTableOfContentsFromMarkdown = (
  markdown: string
): ComponentProps<typeof TableOfContents>["contents"] => {
  const lines = markdown.split("\n")
  const data: Data = []

  let currentH2:
    | (Heading & {
        /** h3 */
        h3?: Array<
          Heading & {
            /** h4 */
            h4?: Array<Heading>
          }
        >
      })
    | null = null
  let currentH3:
    | (Heading & {
        /** h4 */
        h4?: Array<Heading>
      })
    | null = null
  let currentH4: Heading | null = null

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
