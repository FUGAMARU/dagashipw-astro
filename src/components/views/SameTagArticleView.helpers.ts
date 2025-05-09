import { countBy, shuffle } from "es-toolkit"

import { MAX_ARTICLE_CARD_MINI_LIST_DISPLAY_COUNT } from "@/constants/value"
import { isDefined, isValidArray } from "@/utils"

import type { ArticleTags } from "@/types/models"

/**
 * 閲覧中の記事に関連する記事を取得する
 *
 * @description 大まかなロジックは以下の通り
 * 1. 全てのタグについて全体における登場回数を計算
 * 2. タグの登場回数が少ない順に重要度が高いとマークする
 * 3. 現在閲覧中の記事に設定されているタグのうち、同一の重要度が高いタグが設定されている記事が他にあればその中からランダムに選出して候補にする
 * 4. 以降、重要度が高い順に同じ用にして候補記事を選出していく
 * 5. 候補記事の数が規定数に達したら終了
 * @param articleTags - 全ての記事のタグ情報
 * @param currentArticleUrlId - 閲覧中の記事のURL ID
 * @returns 関連する記事のURL ID一覧
 */
export const getRelatedArticles = (
  articleTags: Array<ArticleTags>,
  currentArticleUrlId: string
): Array<string> => {
  const tagFrequencies = countBy(
    articleTags.flatMap(article => article.tags),
    tag => tag.toLowerCase()
  )

  const currentArticle = articleTags.find(article => article.articleUrlId === currentArticleUrlId)
  if (!isDefined(currentArticle)) {
    console.warn(`Article with ID ${currentArticleUrlId} not found.`)
    return []
  }
  const currentTags = currentArticle.tags.map(tag => tag.toLowerCase())

  const uniqueCurrentTags = [...new Set(currentTags)]

  const sortedUniqueTags = uniqueCurrentTags.sort((tagA, tagB) => {
    const freqA = tagFrequencies[tagA] ?? 0
    const freqB = tagFrequencies[tagB] ?? 0
    return freqA - freqB
  })

  return sortedUniqueTags.reduce<Array<string>>((currentRecommendations, priorityTag) => {
    if (currentRecommendations.length >= MAX_ARTICLE_CARD_MINI_LIST_DISPLAY_COUNT) {
      return currentRecommendations
    }

    const candidatesForThisTag = articleTags
      .filter(
        article =>
          article.articleUrlId !== currentArticleUrlId &&
          !currentRecommendations.includes(article.articleUrlId) &&
          article.tags.map(t => t.toLowerCase()).includes(priorityTag)
      )
      .map(article => article.articleUrlId)

    if (!isValidArray(candidatesForThisTag)) {
      return currentRecommendations
    }

    const neededCount = MAX_ARTICLE_CARD_MINI_LIST_DISPLAY_COUNT - currentRecommendations.length
    const selectedIds = shuffle(candidatesForThisTag).slice(0, neededCount)

    return [...currentRecommendations, ...selectedIds]
  }, [])
}
