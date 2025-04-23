import styles from "@/components/parts/CommonViewContainer.module.css"
import { SectionTitle } from "@/components/parts/SectionTitle"

import type { Children } from "@/types/children"
import type { ComponentProps, ReactNode } from "react"

/** Props */
type Props = {
  /** 右上に表示する要素 */
  rightTopElement?: ReactNode
} & ComponentProps<typeof SectionTitle> &
  Children

/** Viewコンポーネントのコンテナ */
export const CommonViewContainer = ({ rightTopElement, children, ...sectionTitleProps }: Props) => {
  return (
    <div className={styles.commonViewContainer}>
      <div className={styles.header}>
        <SectionTitle {...sectionTitleProps} />
        {rightTopElement}
      </div>

      {children}
    </div>
  )
}
