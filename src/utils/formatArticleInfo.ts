import { getColorFromURL } from "color-thief-node"

import { STRAPI_BASE_URL } from "@/constants/value"
import { convertRGBToHex } from "@/utils/color"
import { extractBeginningParagraph } from "@/utils/extractBeginningParagraph"
import { formatDateString } from "@/utils/formatDateString"
import { isDefined } from "@/utils/isDefined"

import type { ArticleInfo } from "@/types/article"
import type { components } from "@/types/schema"

/**
 * CMSから取得した記事情報を内部的に扱いやすいフォーマットに整形する
 * @param articleInfo 記事情報
 * @returns 整形された記事情報
 */
export const formatArticleInfo = async (
  articleInfo: components["schemas"]["Article"]
): Promise<ArticleInfo> => {
  const thumbnailUrl = `${STRAPI_BASE_URL}${articleInfo.thumbnail.data?.attributes?.url}`

  const thumbnailDominantColorRGB = await getColorFromURL(thumbnailUrl)

  const baseData = {
    articleUrlId: articleInfo.articleUrlId,
    backNumber: 1, // TODO: 実際の値を反映させる必要がある
    title: articleInfo.title,
    thumbnailUrl,
    dominantColorCode: convertRGBToHex(thumbnailDominantColorRGB),
    tags: (articleInfo.tags as Array<string>) ?? [],
    bodyBeginningParagraph: extractBeginningParagraph(articleInfo.body),
    commentCount: 1 // TODO: 実際の値を反映させる必要がある
  } as const satisfies Partial<ArticleInfo>

  // 記事作成日はforceCreatedAtが指定されていればその値を優先して使用する
  const createdAtData = articleInfo.forceCreatedAt ?? articleInfo.createdAt

  if (!isDefined(createdAtData)) {
    throw new Error("記事作成日のデーターが存在しません")
  }

  const createdAt = formatDateString(createdAtData)

  // 記事更新日はforceUpdatedAtだけを使用する
  const updatedAt = articleInfo.forceUpdatedAt

  return {
    ...baseData,
    createdAt,
    updatedAt: isDefined(updatedAt) ? formatDateString(updatedAt) : undefined
  }
}
