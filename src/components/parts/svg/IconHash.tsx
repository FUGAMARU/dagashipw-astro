import type { SvgProps } from "@/types/svg"
import type { ReactNode } from "react"

/**
 * ハッシュタグアイコン
 * @returns ReactNode
 */
const IconHash = ({ width, height, className }: SvgProps): ReactNode => {
  return (
    <svg
      className={className}
      height={height}
      viewBox="0 0 16 16"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33331 5.99999H12.6666M3.33331 9.99999H12.6666M7.33331 2.66666L4.66665 13.3333M11.3333 2.66666L8.66665 13.3333"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.33333"
      />
    </svg>
  )
}

export default IconHash
