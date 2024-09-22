import type { SvgProps } from "@/types/svg"

/** 下向きの角丸三角形アイコン */
export const IconRoundedTriangleDown = ({ width, height, className }: SvgProps) => {
  return (
    <svg
      className={className}
      height={height}
      viewBox="0 0 8 8"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_284_1149)">
        <path d="M2.91802 6.878C3.39902 7.7105 4.60102 7.7105 5.08202 6.878L7.54052 2.6255C8.02252 1.792 7.42102 0.75 6.45852 0.75H1.54152C0.579018 0.75 -0.0224819 1.792 0.459518 2.6255L2.91802 6.878Z" />
      </g>
      <defs>
        <clipPath id="clip0_284_1149">
          <rect height="8" transform="matrix(0 1 -1 0 8 0)" width="8" />
        </clipPath>
      </defs>
    </svg>
  )
}
