import { Link } from "@/components/parts/common/Link"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import styles from "@/components/parts/Tag.module.css"

/** Props */
type Props = {
  /** テキスト */
  text: string
  /** 遷移先 */
  href: string
}

/** タグ */
export const Tag = ({ text, href }: Props) => {
  return (
    <Link href={href}>
      <span className={styles.tagComponent}>
        <SvgLoader className={styles.icon} height={16} name="hash" width={16} />
        <span>{text}</span>
      </span>
    </Link>
  )
}
