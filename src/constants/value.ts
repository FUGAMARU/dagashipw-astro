/**
 * @file 分類しにくい定数
 */

/** 1ページあたりの記事表示数 */
export const ARTICLES_PER_PAGE = 10

/** ArticleCardMiniListの最大表示数 */
export const MAX_ARTICLE_CARD_MINI_LIST_DISPLAY_COUNT = 4

/** コメントを投稿する際のニックネームの最大文字数 */
export const COMMENT_USER_NAME_MAX_LENGTH = 20

/** コメントを投稿する際の本文の最大文字数 */
export const COMMENT_BODY_MAX_LENGTH = 1000

/** Cloudflare Turnstileのトークン検証APIエンドポイント */
export const TURNSTILE_VERIFY_API_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

/** 見出し用IDを付与できなかった際のフォールバックID */
export const FALLBACK_HEADING_ID = "section"

/** デフォルトのOGP画像のファイル名 */
export const DEFAULT_OGP_IMAGE_FILENAME = "ogp.jpg"

/** レスポンシブ対応する際のSP表示の最大サイズ */
export const RESPONSIVE_SP_MAX_WIDTH = 999
