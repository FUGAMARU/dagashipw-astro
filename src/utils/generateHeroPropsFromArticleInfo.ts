import { STRAPI_BASE_URL } from "@/constants/value"
import { formatDateString } from "@/utils/formatDateString"
import { isDefined } from "@/utils/isDefined"

import type { HeroProps } from "@/components/templates/hero/Hero"
import type { components } from "@/types/schema"

/**
 * 記事情報からHeroPropsを生成する
 * @param articleInfo 記事情報
 * @returns HeroProps
 */
export const generateHeroPropsFromArticleInfo = (
  articleInfo: components["schemas"]["Article"]
): HeroProps => {
  const baseData = {
    commentCount: 1, // TODO: 実際の値を反映させる必要がある
    backNumber: 1, // TODO: 実際の値を反映させる必要がある
    title: articleInfo.title,
    tags: (articleInfo.tags as Array<string>) ?? [],
    thumbnailUrl: `${STRAPI_BASE_URL}${articleInfo.thumbnail?.data?.attributes?.url}`
  }

  // 記事作成日はforceCreatedAtが指定されていればその値を優先して使用する
  const createdAtData = articleInfo.forceCreatedAt ?? articleInfo.createdAt

  if (!isDefined(createdAtData)) {
    throw new Error("記事作成日のデーターが存在しません")
  }

  const createdAt = formatDateString(createdAtData)

  const baseDataWithCreatedAt = {
    ...baseData,
    createdAt
  }

  // 記事更新日はforceUpdatedAtだけを使用する
  const updatedAt = articleInfo.forceUpdatedAt

  // 記事更新日が存在しない場合はPropsに含めない
  if (!isDefined(updatedAt)) {
    return baseDataWithCreatedAt
  }

  return {
    ...baseDataWithCreatedAt,
    updatedAt: formatDateString(updatedAt)
  }
}
