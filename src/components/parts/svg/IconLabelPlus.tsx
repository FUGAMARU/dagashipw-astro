import type { SvgProps } from "@/types/svg"

/** ラベルにプラスマークが付いたアイコン */
export const IconLabelPlus = (svgProps: SvgProps) => {
  return (
    <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path d="M21 12.3481L16.63 18.5081C16.26 19.0281 15.65 19.3481 15 19.3481H12V17.3481H15L18.55 12.3481L15 7.34814H5V10.3481H3V7.34814C3 6.24814 3.9 5.34814 5 5.34814H15C15.65 5.34814 16.26 5.65814 16.63 6.18814L21 12.3481ZM10 15.3481H7V12.3481H5V15.3481H2V17.3481H5V20.3481H7V17.3481H10V15.3481Z" />
    </svg>
  )
}
