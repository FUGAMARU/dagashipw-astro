import styles from "@/components/parts/ImageCaption.module.css"
import { parseMarkdownLinks } from "@/utils/markdown"

/** Props */
type Props = {
  /** キャプション */
  caption: string
}

/** 画像キャプション */
export const ImageCaption = ({ caption }: Props) => {
  return <figcaption className={styles.imageCaption}>{parseMarkdownLinks(caption)}</figcaption>
}
