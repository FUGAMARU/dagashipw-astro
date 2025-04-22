import clsx from "clsx"

import styles from "@/components/parts/CommonViewContainer.module.css"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"

import type { Children } from "@/types/children"
import type { SvgComponentName } from "@/types/svg"
import type { ReactNode } from "react"

/** Props */
type Props = {
  /** アイコン */
  icon: {
    /** 名前 */
    name: SvgComponentName
    /** 着色方法 */
    coloringMethod: "fill" | "stroke"
  }
  /** タイトル */
  title: string
  /** 右上に表示する要素 */
  rightTopElement?: ReactNode
} & Children

/** Viewコンポーネントのコンテナ */
export const CommonViewContainer = ({ icon, title, rightTopElement, children }: Props) => {
  return (
    <div className={styles.commonViewContainer}>
      <div className={styles.header}>
        <div
          className={clsx(
            styles.left,
            icon.coloringMethod === "fill" ? styles.Fill : styles.Stroke
          )}
        >
          <SvgLoader height={20} width={20} {...icon} />
          <span className={styles.text}>{title}</span>
        </div>
        {rightTopElement}
      </div>

      {children}
    </div>
  )
}
