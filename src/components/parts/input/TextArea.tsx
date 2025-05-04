import styles from "@/components/parts/input/TextArea.module.css"

import type { ComponentProps } from "react"

/** Props */
type Props = ComponentProps<"textarea">

/** TextAreaコンポーネント */
export const TextArea = (textAreaProps: Props) => {
  return <textarea className={styles.textArea} {...textAreaProps} />
}
