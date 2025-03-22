/**
 * @file カスタムイベントに関する定数
 */

/**
 * 目次コンポーネントのハイドレーションが完了した時のイベント
 * (目次コンポーネントのハイドレーション完了後で無いとサイドバーの中身がオーバーフローしているか判定できないためカスタムイベントを利用する)
 */
export const CUSTOM_EVENT_TABLE_OF_CONTENTS_HYDRATION_COMPLETE = "tableOfContentsHydrationComplete"
