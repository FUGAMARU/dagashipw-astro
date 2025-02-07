import { Link } from "@/components/parts/common/Link"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import styles from "@/components/parts/Tag.module.css"

import type { ComponentProps } from "react"

/** Props */
type Props = {
  /** テキスト */
  text: string
} & Pick<ComponentProps<typeof Link>, "href">

/** タグ */
export const Tag = ({ text, ...linkProps }: Props) => {
  return (
    <Link {...linkProps}>
      <span className={styles.tagComponent}>
        <SvgLoader className={styles.icon} height={16} name="hash" width={16} />
        <span>{text}</span>
      </span>
    </Link>
  )
}
