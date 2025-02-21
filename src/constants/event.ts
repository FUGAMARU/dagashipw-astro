/**
 * @file カスタムイベントに関する定数
 */

/** アクティブな見出しが変わった時のイベント */
export const CUSTOM_EVENT_ACTIVE_HEADING_CHANGE = "activeHeadingChange"

/**
 * 目次コンポーネントのハイドレーションが完了した時のイベント
 * (目次コンポーネントのハイドレーション完了後で無いとサイドバーの中身がオーバーフローしているか判定できないためカスタムイベントを利用する)
 */
export const CUSTOM_EVENT_TABLE_OF_CONTENTS_HYDRATION_COMPLETE = "tableOfContentsHydrationComplete"
