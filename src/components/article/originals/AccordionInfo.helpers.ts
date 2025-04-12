import type { SvgComponentName } from "@/types/svg"

/** 表示タイプ一覧 */
export type AccordionInfoDisplayType = "tips" | "warning"

/** 共通イージングスタイル */
export const ACCORDION_INFO_COMMON_EASING_STYLE = "cubicBezier(0.77,0,0.18,1)"

/**
 * 表示タイプごとのリソース定義
 *
 * @see アイコン色 https://developer.apple.com/design/human-interface-guidelines/color
 */
export const ACCORDION_INFO_RESOURCES_BY_DISPLAY_TYPE = {
  tips: {
    iconName: "inspiration",
    iconColor: "#ffcc00",
    label: "Tips"
  },
  warning: {
    iconName: "warning",
    iconColor: "#ff9500",
    label: "Warning"
  }
} as const satisfies Record<
  AccordionInfoDisplayType,
  {
    /** アイコン名 */
    iconName: SvgComponentName
    /** アイコン色 */
    iconColor: string
    /** ラベル */
    label: string
  }
>
