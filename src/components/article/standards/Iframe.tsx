import styles from "@/components/article/standards/Iframe.module.css"

import type { ComponentProps } from "react"

/** Props */
type Props = ComponentProps<"iframe">

/** iframeタグコンポーネント */
export const Iframe = (props: Props) => {
  return <iframe className={styles.iframeTag} {...props} />
}
