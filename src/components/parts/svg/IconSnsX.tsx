import type { SvgProps } from "@/types/svg"
import type { ReactNode } from "react"

/**
 * SNSアイコン (X)
 * @returns ReactNode
 */
const IconSnsX = ({ width, height, className }: SvgProps): ReactNode => {
  return (
    <svg
      className={className}
      height={height}
      id="layer"
      viewBox="0 0 1180.51 1180.51"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          {`
            .cls-1 {
              fill: #000;
            }
            .cls-1, .cls-2 {
              stroke-width: 0px;
            }
            .cls-2 {
              fill: #fff;
            }
          `}
        </style>
      </defs>
      <circle className="cls-1" cx="590.26" cy="590.26" id="circle" r="590.26" />
      <path
        className="cls-2"
        d="M661.19,531.91l277.59-322.67h-65.78l-241.03,280.17-192.51-280.17h-222.04l291.11,423.67-291.11,338.37h65.78l254.53-295.87,203.3,295.87h222.04l-301.91-439.37h.02ZM571.1,636.64l-29.5-42.19-234.69-335.69h101.04l189.39,270.92,29.5,42.19,246.19,352.15h-101.04l-200.9-287.35v-.02Z"
        id="path"
      />
    </svg>
  )
}

export default IconSnsX
