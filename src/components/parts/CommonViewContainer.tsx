import styles from "@/components/parts/CommonViewContainer.module.css"
import { SectionTitle } from "@/components/parts/SectionTitle"

import type { Children } from "@/types/children"
import type { ComponentProps, ReactNode } from "react"

/** Props */
type Props = {
  /** コメント投稿ボタン */
  commentPostButton?: ReactNode
} & ComponentProps<typeof SectionTitle> &
  Children

/** Viewコンポーネントのコンテナ */
export const CommonViewContainer = ({
  commentPostButton,
  children,
  ...sectionTitleProps
}: Props) => {
  return (
    <div className={styles.commonViewContainer}>
      <div className={styles.header}>
        <SectionTitle {...sectionTitleProps} />
        {commentPostButton}
      </div>
      {children}
    </div>
  )
}
