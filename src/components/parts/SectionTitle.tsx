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
    <div
      className={clsx(
        styles.sectionTitle,
        icon.coloringMethod === "fill" ? styles.Fill : styles.Stroke
      )}
    >
      <SvgLoader height={20} width={20} {...icon} />
      <span className={styles.text}>{title}</span>
    </div>
  )
}
