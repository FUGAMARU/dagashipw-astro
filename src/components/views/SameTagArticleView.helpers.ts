import { countBy, shuffle } from "es-toolkit"

import { isDefined } from "@/utils"

import type { ArticleTags } from "@/types/models"

/** 関連記事の最大表示数 */
const MAX_RELATED_ARTICLES_DISPLAY_COUNT = 4

/**
 * 指定された記事に関連する記事をおすすめとして取得する関数（希少タグ優先、ランダム選出）
 * (Lodashを部分的に使用)
 *
 * @param {ArticleData[]} articles - 全記事データの配列
 * @param {string} currentArticleUrlId - 現在表示している記事のID
 * @returns {string[]} おすすめ記事のID配列（最大4件）
 */
export const getRecommendedArticlesWithLodash = (
  articles: Array<ArticleTags>,
  currentArticleUrlId: string
): Array<string> => {
  // --- 1. タグ頻度計算 & 正規化 (LodashのcountByを使用) ---
  const tagFrequencies = countBy(
    // 全記事のタグ配列を一つの配列にまとめる
    articles.flatMap(article => article.tags),
    // 各タグを小文字に正規化して、その値でカウント
    tag => tag.toLowerCase()
  )
  // 結果例: { docker: 3, strapi: 3, it: 3, インフラ: 3, react: 1, ... }

  // --- 2. 閲覧中記事のタグ取得 & 正規化 (標準メソッドで十分) ---
  const currentArticle = articles.find(article => article.articleUrlId === currentArticleUrlId)
  if (!isDefined(currentArticle)) {
    console.warn(`Article with ID ${currentArticleUrlId} not found.`)
    return []
  }
  const currentTags = currentArticle.tags.map(tag => tag.toLowerCase())

  // --- 3. 閲覧中記事タグの重要度ソート (標準メソッドで十分) ---
  // 記事内でタグが重複していても意味は同じなのでユニークにする
  const uniqueCurrentTags = [...new Set(currentTags)]

  // ユニークなタグを、全体の登場頻度が低い順（＝希少な順）にソート
  const sortedUniqueTags = uniqueCurrentTags.sort((tagA, tagB) => {
    const freqA = tagFrequencies[tagA] ?? 0
    const freqB = tagFrequencies[tagB] ?? 0
    return freqA - freqB // 昇順ソート
  })

  // --- 4. 候補記事の段階的選定 (ランダム選出にLodashのshuffle, takeを使用) ---
  const recommendedIds = sortedUniqueTags.reduce<Array<string>>(
    (currentRecommendations, priorityTag) => {
      if (currentRecommendations.length >= MAX_RELATED_ARTICLES_DISPLAY_COUNT) {
        return currentRecommendations
      }

      // この優先度タグを持つ、まだ選ばれていない候補記事IDを探す (標準メソッドで十分)
      const candidatesForThisTag = articles
        .filter(
          article =>
            article.articleUrlId !== currentArticleUrlId &&
            !currentRecommendations.includes(article.articleUrlId) &&
            article.tags.map(t => t.toLowerCase()).includes(priorityTag)
        )
        .map(article => article.articleUrlId)

      if (candidatesForThisTag.length === 0) {
        return currentRecommendations
      }

      const neededCount = MAX_RELATED_ARTICLES_DISPLAY_COUNT - currentRecommendations.length

      // Lodashを使って候補記事IDリストをシャッフルし、必要な数だけ先頭から取得
      const selectedIds = shuffle(candidatesForThisTag).slice(0, neededCount)

      return [...currentRecommendations, ...selectedIds]
    },
    []
  )

  return recommendedIds
}
