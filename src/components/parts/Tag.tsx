import { Link } from "@/components/parts/common/Link"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import styles from "@/components/parts/Tag.module.css"
import { PAGE_PATH } from "@/constants/page"
import { QUERY_PARAM_KEYS } from "@/constants/query"

/** Props */
type Props = {
  /** テキスト */
  text: string
}

/** タグ */
export const Tag = ({ text }: Props) => {
  return (
    <Link
      className={styles.tagComponent}
      href={`${PAGE_PATH.SEARCH}?${QUERY_PARAM_KEYS.TAG}=${encodeURIComponent(text)}`}
    >
      <SvgLoader className={styles.icon} name="hash" />
      <span>{text}</span>
    </Link>
  )
}
