import type { SvgProps } from "@/types/svg"

/** ハッシュタグアイコン */
export const IconHash = (svgProps: SvgProps) => {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
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
