import { useMediaQuery } from "usehooks-ts"

/** ViewportがSPサイズかどうかを返すフック */
export const useIsSP = () => {
  return useMediaQuery("(max-width: 767px)")
}
