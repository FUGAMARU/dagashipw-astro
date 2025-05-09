import useSWR from "swr"

import { ImageCore } from "@/components/parts/image/ImageCore"
import { selfHostedFetcher } from "@/services/self-hosted-api"
import { isValidString } from "@/utils"

import type { ComponentProps } from "react"

/** Props */
type Props = ComponentProps<typeof ImageCore>

/** CSRでのみ利用可能な画像表示用コンポーネント */
export const ImageOnlyClient = ({ src, ...props }: Props) => {
  const { data: signedSrc } = useSWR<string>(`signed-image-url?src=${src}`, selfHostedFetcher)

  if (!isValidString(signedSrc)) {
    return null // TODO: フォールバックイメージを表示するべきか？ null返すとレイアウトシフト起こしそう
  }

  return <ImageCore {...props} src={signedSrc} />
}
