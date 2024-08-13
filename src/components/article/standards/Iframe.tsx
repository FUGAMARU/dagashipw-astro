import styles from "@/components/article/standards/Iframe.module.css"

import type { ComponentProps, ReactNode } from "react"

type Props = ComponentProps<"iframe">

/**
 * iframeタグコンポーネント
 * @param props Props
 * @returns iframeタグ
 */
const Iframe = (props: Props): ReactNode => {
  return <iframe className={styles.iframeTag} {...props} />
}

export default Iframe
