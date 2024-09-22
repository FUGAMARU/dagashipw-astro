import type { SvgProps } from "@/types/svg"

/** ペンが一緒になったコメントアイコン */
export const IconCommentWithPen = (svgProps: SvgProps) => {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path d="M13.6 6.50722V4.45282C13.6 3.77042 13.0368 3.20002 12.32 3.20002H3.67998C2.96318 3.20002 2.39998 3.77042 2.39998 4.45282V9.82082C2.39998 10.5032 2.96318 11.0736 3.67998 11.0736H4.95998V13.6H4.96238L4.96398 13.5992L6.69758 12.3192L6.44638 13.3224C6.42931 13.3907 6.41704 13.4587 6.40958 13.5264L5.43918 14.2424C5.2688 14.3678 5.05607 14.4213 4.84667 14.3915C4.63726 14.3618 4.44788 14.2511 4.31918 14.0832C4.21621 13.9474 4.16032 13.7817 4.15998 13.6112V11.8736H3.67998C2.53118 11.8736 1.59998 10.9544 1.59998 9.82082V4.45282C1.59998 3.31922 2.53118 2.40002 3.67998 2.40002H12.32C13.4688 2.40002 14.4 3.31922 14.4 4.45282V6.95202C14.1655 6.7521 13.8935 6.60089 13.6 6.50722ZM11.8456 7.63682L7.98158 11.5008C7.75676 11.7261 7.59724 12.0081 7.51998 12.3168L7.21998 13.5152C7.19022 13.6345 7.19184 13.7594 7.22467 13.8778C7.2575 13.9962 7.32043 14.1042 7.40733 14.1911C7.49424 14.278 7.60215 14.3409 7.72059 14.3737C7.83902 14.4066 7.96393 14.4082 8.08318 14.3784L9.28158 14.0784C9.59039 14.0009 9.87241 13.8411 10.0976 13.616L13.9616 9.75202C14.1022 9.61348 14.2141 9.44846 14.2907 9.26648C14.3672 9.08451 14.407 8.88917 14.4078 8.69174C14.4085 8.49431 14.3701 8.29869 14.2949 8.11615C14.2197 7.93362 14.109 7.76778 13.9694 7.6282C13.8298 7.48862 13.6639 7.37806 13.4813 7.30289C13.2988 7.22773 13.1031 7.18944 12.9057 7.19024C12.7083 7.19104 12.5129 7.23092 12.331 7.30756C12.149 7.38421 11.9841 7.49612 11.8456 7.63682Z" />
    </svg>
  )
}
