import type { SvgProps } from "@/types/svg"

/** コピーアイコン */
export const IconCopy = (svgProps: SvgProps) => {
  return (
    <svg fill="none" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path
        d="M12.7188 4.5H5.78125C4.79749 4.5 4 5.29749 4 6.28125V13.2188C4 14.2025 4.79749 15 5.78125 15H12.7188C13.7025 15 14.5 14.2025 14.5 13.2188V6.28125C14.5 5.29749 13.7025 4.5 12.7188 4.5Z"
        stroke="white"
        strokeLinejoin="round"
      />
      <path
        d="M11.9844 4.5L12 3.75C11.9987 3.28628 11.8139 2.84192 11.486 2.51402C11.1581 2.18612 10.7137 2.00132 10.25 2H3.5C2.97005 2.00157 2.46225 2.21278 2.08752 2.58752C1.71278 2.96225 1.50157 3.47005 1.5 4V10.75C1.50132 11.2137 1.68612 11.6581 2.01402 11.986C2.34192 12.3139 2.78628 12.4987 3.25 12.5H4"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
