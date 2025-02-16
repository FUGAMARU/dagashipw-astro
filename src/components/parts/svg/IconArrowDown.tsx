import type { SvgProps } from "@/types/svg"

/** 下向き矢印アイコン */
export const IconArrowDown = (svgProps: SvgProps) => {
  return (
    <svg fill="transparent" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path d="M5.625 7.5L10 11.875L14.375 7.5" />
    </svg>
  )
}
