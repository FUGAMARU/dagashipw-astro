import styles from "@/components/article/standards/Paragraph.module.css"

import type { Children } from "@/types/children"

/** 段落(pタグ)コンポーネント */
export const Paragraph = ({ children }: Children) => {
  return <p className={styles.paragraphTag}>{children}</p>
}
