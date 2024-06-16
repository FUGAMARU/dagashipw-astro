import type { SvgProps } from "@/types/svg"
import type { ReactNode } from "react"

/**
 * SNSアイコン (はてなブックマーク)
 * @returns ReactNode
 */
const IconSnsHatenaBookmark = ({ width, height, className }: SvgProps): ReactNode => {
  return (
    <svg
      className={className}
      height={height}
      id="layer"
      viewBox="0 0 430.98 430.98"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          {`.cls-1-hatena {
        fill: #00a4de;
      }

      .cls-1-hatena, .cls-2-hatena {
        stroke-width: 0px;
      }

      .cls-2-hatena {
        fill: #fff;
      }`}
        </style>
      </defs>
      <g id="circle">
        <circle className="cls-1-hatena" cx="215.49" cy="215.49" r="215.49" />
      </g>
      <g id="group">
        <path
          className="cls-2-hatena"
          d="M243.66,223.59c-9.06-10.12-21.65-15.81-37.8-17.04,14.37-3.92,24.81-9.65,31.41-17.3,6.57-7.55,9.83-17.81,9.83-30.71,0-10.22-2.23-19.25-6.56-27.06-4.44-7.76-10.81-13.97-19.19-18.62-7.33-4.03-16.04-6.87-26.2-8.55-10.21-1.62-28.07-2.45-53.7-2.45h-62.32v227.27h64.21c25.79,0,44.39-.9,55.77-2.63,11.36-1.79,20.9-4.79,28.61-8.91,9.54-5.04,16.83-12.21,21.91-21.42,5.12-9.24,7.66-19.89,7.66-32.08,0-16.85-4.54-30.4-13.63-40.49ZM136.67,152.24h13.3c15.37,0,25.7,1.74,31.03,5.19,5.26,3.47,7.94,9.47,7.94,18s-2.85,14-8.5,17.39c-5.72,3.33-16.15,5.02-31.41,5.02h-12.37v-45.6ZM189.43,282.57c-6.05,3.72-16.48,5.54-31.11,5.54h-21.65v-49.65h22.58c15.03,0,25.42,1.89,30.94,5.67,5.61,3.78,8.38,10.45,8.38,20.03,0,8.57-3.03,14.72-9.14,18.42Z"
        />
        <path
          className="cls-2-hatena"
          d="M323.07,271.55c-15.91,0-28.79,12.88-28.79,28.78s12.89,28.79,28.79,28.79,28.78-12.89,28.78-28.79-12.9-28.78-28.78-28.78Z"
        />
        <rect className="cls-2-hatena" height="151.52" width="50" x="298.07" y="101.85" />
      </g>
    </svg>
  )
}

export default IconSnsHatenaBookmark
