import { ImageCore } from "@/components/parts/image/ImageCore"
import { isValidString } from "@/utils"
import { getLightweightImageUrl } from "@/utils/image"

import type { ComponentProps } from "react"

/** Props */
type Props = ComponentProps<typeof ImageCore>

/** SSRでのみ利用可能な画像表示用コンポーネント */
export const ImageOnlyServer = ({ src, ...props }: Props) => {
  if (!isValidString(src)) {
    return null
  }

  return <ImageCore {...props} src={getLightweightImageUrl(src)} />
}
