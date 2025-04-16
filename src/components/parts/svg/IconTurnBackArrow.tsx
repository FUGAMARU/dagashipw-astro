import type { SvgProps } from "@/types/svg"

/** 折り返し矢印アイコン */
export const IconTurnBackArrow = (svgProps: SvgProps) => {
  return (
    <svg viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path d="M6 11.0146H10.8L9.06667 12.748L10 13.6813L13.3333 10.348L10 7.01465L9.06667 7.94798L10.8 9.68132H6C4.53333 9.68132 3.33333 8.48132 3.33333 7.01465C3.33333 5.54798 4.53333 4.34798 6 4.34798H7.33333V3.01465H6C3.8 3.01465 2 4.81465 2 7.01465C2 9.21465 3.8 11.0146 6 11.0146Z" />
    </svg>
  )
}
