import { useMediaQuery } from "usehooks-ts"

/**
 * ViewportがSPサイズかどうかを返すフック
 * @returns SPサイズかどうか
 */
const useIsSP = (): boolean => {
  return useMediaQuery("(max-width: 767px)")
}

export default useIsSP
