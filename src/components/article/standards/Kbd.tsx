import styles from "@/components/article/standards/Kbd.module.css"

import type { Children } from "@/types/children"

/** kbdタグコンポーネント */
export const Kbd = ({ children }: Children) => {
  return <kbd className={styles.kbdTag}>{children}</kbd>
}
