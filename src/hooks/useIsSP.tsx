import { useMediaQuery } from "usehooks-ts"

import { RESPONSIVE_SP_MAX_WIDTH } from "@/constants/value"

/** ViewportがSPサイズかどうかを返すフック */
export const useIsSP = () => {
  return useMediaQuery(`(max-width: ${RESPONSIVE_SP_MAX_WIDTH}px)`)
}
