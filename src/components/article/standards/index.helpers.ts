import { Children as ReactChildren, cloneElement, isValidElement } from "react"

import { isDefined, isValidString } from "@/utils"
import { unescapeNewlines } from "@/utils/formatter"

import type { ReactNode } from "react"

/**
 * Blockquote配下の文字列ノードを改行展開する
 *
 * @param child - Blockquote配下の子ノード
 * @returns 改行が展開された子ノード
 */
export const normalizeBlockquoteChild = (child: ReactNode): ReactNode => {
  if (typeof child === "string" && isValidString(child)) {
    return unescapeNewlines(child)
  }

  if (
    !isValidElement<{
      /** children */
      children?: ReactNode
      /** astro-remoteのStaticHtmlが受け取るHTML文字列 */
      value?: unknown
    }>(child)
  ) {
    return child
  }

  const rawValue = child.props.value
  const hasStringValue = typeof rawValue === "string" || rawValue instanceof String
  const normalizedValue = hasStringValue ? unescapeNewlines(String(rawValue)) : undefined
  const hasNormalizedValue = hasStringValue && normalizedValue !== String(rawValue)

  if (!isDefined(child.props.children)) {
    if (!hasNormalizedValue) {
      return child
    }

    return cloneElement(child, {
      value: normalizedValue
    })
  }

  const normalizedNestedChildren = ReactChildren.map(child.props.children, normalizeBlockquoteChild)

  return cloneElement(
    child,
    hasNormalizedValue
      ? {
          value: normalizedValue
        }
      : undefined,
    normalizedNestedChildren
  )
}
