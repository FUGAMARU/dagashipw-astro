import clsx from "clsx"
import { useMemo, type ComponentProps, type ReactNode } from "react"

import styles from "@/components/article/standards/Image.module.css"
import Link from "@/components/parts/common/Link"
import { isDefined } from "@/utils/isDefined"

type Props = ComponentProps<"img"> & {
  objectFitCover?: boolean
}

/**
 * 画像コンポーネント
 * @returns ReactNode
 */
const Image = ({ className, objectFitCover = false, ...props }: Props): ReactNode => {
  const src = useMemo(() => props.src, [props.src])

  if (!isDefined(src)) {
    return <span>NoImage</span>
  }

  return (
    <Link href={src}>
      {/** TODO: 画像押下の場合は画像拡大モーダルを開くようにするかどうか要検討 */}
      <img
        className={clsx(className, styles.imageTag, objectFitCover && styles.Covered)}
        {...props}
      />
    </Link>
  )
}

export default Image
