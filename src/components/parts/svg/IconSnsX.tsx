import type { SvgProps } from "@/types/svg"

/** SNSアイコン (X) */
export const IconSnsX = (svgProps: SvgProps) => {
  return (
    <svg id="layer" viewBox="0 0 1180.51 1180.51" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <defs>
        <style>
          {`
            .clsx-1-x {
              fill: #000;
            }
            .clsx-1-x, .clsx-2-x {
              stroke-width: 0px;
            }
            .clsx-2-x {
              fill: #fff;
            }
          `}
        </style>
      </defs>
      <circle className="clsx-1-x" cx="590.26" cy="590.26" id="circle" r="590.26" />
      <path
        className="clsx-2-x"
        d="M661.19,531.91l277.59-322.67h-65.78l-241.03,280.17-192.51-280.17h-222.04l291.11,423.67-291.11,338.37h65.78l254.53-295.87,203.3,295.87h222.04l-301.91-439.37h.02ZM571.1,636.64l-29.5-42.19-234.69-335.69h101.04l189.39,270.92,29.5,42.19,246.19,352.15h-101.04l-200.9-287.35v-.02Z"
        id="path"
      />
    </svg>
  )
}
