/* eslint-disable jsdoc/require-jsdoc */

/** /articles/[articleId] */

export interface Article {
  data: ArticleData
  meta: ArticleMeta
}

interface ArticleData {
  id: number
  attributes: ArticleAttributes
}

interface ArticleAttributes {
  title: string
  ExplicitUpdatedAt: string
  tags: Array<string>
  body: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  articleUrlId: string
}

interface ArticleMeta {}
