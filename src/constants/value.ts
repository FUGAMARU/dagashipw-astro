/**
 * @file 分類しにくい定数
 */

/** 記事本文の冒頭何文字を抜き出すか */
export const EXTRACTED_PARAGRAPHS_LENGTH = 200

/** 1ページあたりの記事表示数 */
export const ARTICLES_PER_PAGE = 10

/** サムネイルからテーマカラーを取得できなかった場合のフォールバック色 */
export const FALLBACK_THEME_COLOR = "#343434"

/** ユーザー名が指定されていない場合に表示するコメント投稿者のユーザー名 */
export const FALLBACK_COMMENT_USER_NAME = "匿名ユーザー"

/** PCのメディアクエリの最小横幅ピクセル数 */
export const PC_MEDIA_QUERY_MIN_WIDTH = 1000

/** ArticleCardMiniListの最大表示数 */
export const MAX_ARTICLE_CARD_MINI_LIST_DISPLAY_COUNT = 4

/** CMS上で画像が配置されているディレクトリ */
export const CMS_IMAGE_DIRECTORY = "uploads"

/** Markdownで使用されている画像URLを軽量化済み画像URLに差し替える時に画像として扱う拡張子の一覧 */
export const MARKDOWN_IMAGE_EXTENSIONS = "png|jpe?g|gif|svg|webp|avif|bmp|tiff|ico|heic|heif"

/** コメントを投稿する際の最大文字数 */
export const COMMENT_MAX_LENGTH = 1000
