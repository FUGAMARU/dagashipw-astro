import styles from "@/components/article/standards/Iframe.module.css"

import type { ComponentProps } from "react"

/** iframeタグコンポーネント */
export const Iframe = (props: ComponentProps<"iframe">) => {
  return <iframe className={styles.iframeTag} {...props} />
}
