import type { SvgProps } from "@/types/svg"
import type { ReactNode } from "react"

/**
 * SNSアイコン (LINE)
 * @returns ReactNode
 */
const IconSnsLine = ({ width, height, className }: SvgProps): ReactNode => {
  return (
    <svg
      // dataName="レイヤー 1"
      className={className}
      height={height}
      id="_レイヤー_1"
      viewBox="0 0 320 320"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          {`.cls-1 {
            fill: #4cc764;
          }

          .cls-1, .cls-2 {
            stroke-width: 0px;
          }

          .cls-2 {
            fill: #fff;
          }`}
        </style>
      </defs>
      <circle className="cls-1" cx="160" cy="160" r="160" />
      <g>
        <path
          className="cls-2"
          d="M266.7,150.68c0-47.8-47.92-86.68-106.81-86.68s-106.81,38.89-106.81,86.68c0,42.85,38,78.73,89.33,85.52,3.48.75,8.21,2.29,9.41,5.27,1.08,2.7.7,6.93.35,9.66,0,0-1.25,7.54-1.52,9.14-.47,2.7-2.15,10.56,9.25,5.76,11.4-4.8,61.51-36.22,83.92-62.01h0c15.48-16.98,22.9-34.2,22.9-53.33Z"
        />
        <g>
          <path
            className="cls-1"
            d="M231.17,178.28c1.13,0,2.04-.91,2.04-2.04v-7.58c0-1.12-.92-2.04-2.04-2.04h-20.39v-7.87h20.39c1.13,0,2.04-.91,2.04-2.04v-7.57c0-1.12-.92-2.04-2.04-2.04h-20.39v-7.87h20.39c1.13,0,2.04-.91,2.04-2.04v-7.57c0-1.12-.92-2.04-2.04-2.04h-30.01c-1.13,0-2.04.91-2.04,2.04v.04h0v46.54h0v.04c0,1.13.91,2.04,2.04,2.04h30.01Z"
          />
          <path
            className="cls-1"
            d="M120.17,178.28c1.13,0,2.04-.91,2.04-2.04v-7.58c0-1.12-.92-2.04-2.04-2.04h-20.39v-37c0-1.12-.92-2.04-2.04-2.04h-7.58c-1.13,0-2.04.91-2.04,2.04v46.58h0v.04c0,1.13.91,2.04,2.04,2.04h30.01Z"
          />
          <rect
            className="cls-1"
            height="50.69"
            rx="2.04"
            ry="2.04"
            width="11.65"
            x="128.62"
            y="127.58"
          />
          <path
            className="cls-1"
            d="M189.8,127.58h-7.58c-1.13,0-2.04.91-2.04,2.04v27.69l-21.33-28.8c-.05-.07-.11-.14-.16-.21,0,0,0,0-.01-.01-.04-.04-.08-.09-.12-.13-.01-.01-.03-.02-.04-.03-.04-.03-.07-.06-.11-.09-.02-.01-.04-.03-.06-.04-.03-.03-.07-.05-.11-.07-.02-.01-.04-.03-.06-.04-.04-.02-.07-.04-.11-.06-.02-.01-.04-.02-.06-.03-.04-.02-.08-.04-.12-.05-.02,0-.04-.02-.07-.02-.04-.01-.08-.03-.12-.04-.02,0-.05-.01-.07-.02-.04,0-.08-.02-.12-.03-.03,0-.06,0-.09-.01-.04,0-.07-.01-.11-.01-.04,0-.07,0-.11,0-.02,0-.05,0-.07,0h-7.53c-1.13,0-2.04.91-2.04,2.04v46.62c0,1.13.91,2.04,2.04,2.04h7.58c1.13,0,2.04-.91,2.04-2.04v-27.68l21.35,28.84c.15.21.33.38.53.51,0,0,.02.01.02.02.04.03.08.05.13.08.02.01.04.02.06.03.03.02.07.03.1.05.03.02.07.03.1.04.02,0,.04.02.06.02.05.02.09.03.14.04,0,0,.02,0,.03,0,.17.04.35.07.53.07h7.53c1.13,0,2.04-.91,2.04-2.04v-46.62c0-1.13-.91-2.04-2.04-2.04Z"
          />
        </g>
      </g>
    </svg>
  )
}

export default IconSnsLine
