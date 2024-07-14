import type { SvgProps } from "@/types/svg"
import type { ReactNode } from "react"

/**
 * 右向きの二重矢印アイコン
 * @returns ReactNode
 */
const IconDoubleRightArrow = ({ width, height, className }: SvgProps): ReactNode => {
  return (
    <svg
      className={className}
      height={height}
      viewBox="0 0 18 19"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.31677 14.8125L8.80652 9.9375L5.31752 5.0625H6.23177L9.72227 9.9375L6.23177 14.8125H5.31677ZM9.66377 14.8125L13.1543 9.9375L9.66302 5.0625H10.578L14.0685 9.9375L10.578 14.8125H9.66377Z" />
    </svg>
  )
}

export default IconDoubleRightArrow
