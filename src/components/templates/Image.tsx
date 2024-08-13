import clsx from "clsx"
import { useMemo, type ComponentProps, type ReactNode } from "react"

import Link from "@/components/parts/common/Link"
import styles from "@/components/templates/Image.module.css"
import { isDefined } from "@/utils/isDefined"

type Props = ComponentProps<"img"> & {
  /** object-fir: cover指定かどうか */
  objectFitCover?: boolean
  /** marginを消すかどうか */
  noMargin?: boolean
}

/**
 * 画像コンポーネント
 * @returns ReactNode
 */
const Image = ({
  className,
  objectFitCover = false,
  noMargin = false,
  ...props
}: Props): ReactNode => {
  const src = useMemo(() => props.src, [props.src])

  if (!isDefined(src)) {
    return <span>NoImage</span>
  }

  return (
    <Link href={src}>
      {/** TODO: 画像押下の場合は画像拡大モーダルを開くようにするかどうか要検討 */}
      <img
        className={clsx(
          className,
          styles.imageTag,
          objectFitCover && styles.Covered,
          noMargin && styles.NoMargin
        )}
        {...props}
      />
    </Link>
  )
}

export default Image
