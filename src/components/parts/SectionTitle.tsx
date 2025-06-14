import clsx from "clsx"

import styles from "@/components/parts/SectionTitle.module.css"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"

import type { SvgComponentName } from "@/types/svg"

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
}

/** セクションタイトル */
export const SectionTitle = ({ icon, title }: Props) => {
  return (
    <div className={styles.sectionTitle}>
      <SvgLoader
        className={clsx(styles.icon, icon.coloringMethod === "fill" ? styles.Fill : styles.Stroke)}
        name={icon.name}
      />
      <span className={styles.text}>{title}</span>
    </div>
  )
}
