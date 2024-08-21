import clsx from "clsx"

import styles from "@/components/templates/Image.module.css"
import { isDefined } from "@/utils/isDefined"

import type { ComponentProps, ReactNode } from "react"

type Props = ComponentProps<"img"> & {
  /** object-fir: cover指定かどうか */
  objectFitCover?: boolean
}

/**
 * 画像コンポーネント
 * @returns ReactNode
 */
const Image = ({ className, objectFitCover = false, src, ...props }: Props): ReactNode => {
  if (!isDefined(src)) {
    return <span>NoImage</span>
  }

  return (
    <img
      // TODO: 画像押下の場合は画像拡大モーダルを開くようにするかどうか要検討
      className={clsx(className, styles.imageTag, objectFitCover && styles.Covered)}
      src={src}
      {...props}
    />
  )
}

export default Image
