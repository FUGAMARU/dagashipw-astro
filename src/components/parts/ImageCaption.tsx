import { LinkInArticle } from "@/components/article/standards/LinkInArticle"
import styles from "@/components/parts/ImageCaption.module.css"
import { isDefined } from "@/utils"
import { convertCommaSeparatedStringToArray } from "@/utils/formatter"

/** Props */
type Props = {
  /** キャプション */
  caption: string
  /** キャプション中リンクテキスト一覧 */
  captionLinkTexts?: string
  /** キャプション中リンク一覧 */
  captionLinks?: string
}

/** 画像キャプション */
export const ImageCaption = ({ caption, captionLinkTexts, captionLinks }: Props) => {
  /** captionの中に含まれるcaptionLinkTextをLinkコンポーネントでラップし、同一インデックスのcaptionLinkLinksのアイテムをhrefに設定する */
  const createLinkedCaption = () => {
    if (!isDefined(captionLinkTexts) || !isDefined(captionLinks)) {
      return caption
    }

    const captionLinkTextArray = convertCommaSeparatedStringToArray(captionLinkTexts)
    const captionLinkArray = convertCommaSeparatedStringToArray(captionLinks)

    if (
      isDefined(captionLinks) &&
      isDefined(captionLinkTexts) &&
      captionLinkArray.length !== captionLinkTextArray.length
    ) {
      throw new Error("キャプションリンク情報が不正です")
    }

    if (!isDefined(caption)) {
      return
    }

    const parts = []
    let currentIndex = 0

    captionLinkTextArray.forEach((text, index) => {
      const startIndex = caption.indexOf(text, currentIndex)

      if (startIndex === -1) {
        return
      }

      if (startIndex > currentIndex) {
        parts.push(caption.substring(currentIndex, startIndex))
      }

      parts.push(
        <LinkInArticle key={captionLinks[index]} href={captionLinks[index]}>
          {text}
        </LinkInArticle>
      )

      currentIndex = startIndex + text.length
    })

    if (currentIndex < caption.length) {
      parts.push(caption.substring(currentIndex))
    }

    return parts
  }

  return <figcaption className={styles.imageCaption}>{createLinkedCaption()}</figcaption>
}
