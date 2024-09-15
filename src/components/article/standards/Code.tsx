import styles from "@/components/article/standards/Code.module.css"

import type { Children } from "@/types/children"

/** Codeタグコンポーネント */
export const Code = ({ children }: Children) => {
  return <code className={styles.codeTag}>{children}</code>
}
