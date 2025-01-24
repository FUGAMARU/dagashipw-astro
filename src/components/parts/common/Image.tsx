import clsx from "clsx"

import { LinkInArticle } from "@/components/article/standards/LinkInArticle"
import styles from "@/components/parts/common/Image.module.css"
import { isDefined } from "@/utils/isDefined"

import type { ComponentProps } from "react"

/** Props */
type Props = Omit<ComponentProps<"img">, "className"> & {
  /** object-fir: cover指定かどうか */
  objectFitCover?: boolean
  /** キャプション */
  caption?: string
  /** キャプション中リンクテキスト一覧 */
  captionLinkTexts?: Array<string>
  /** キャプション中リンク一覧 */
  captionLinks?: Array<string>
  /** figureタグに充てるclassName */
  figureClassName?: string
  /** imgタグに充てるclassName */
  imgClassName?: string
}

/** 画像コンポーネント */
export const Image = ({
  objectFitCover = false,
  caption,
  captionLinks,
  captionLinkTexts,
  src,
  figureClassName,
  imgClassName,
  ...props
}: Props) => {
  if (!isDefined(src)) {
    return <span>NoImage</span>
  }

  /** リンク付きキャプションを生成する */
  const createLinkedCaption = () => {
    if (!isDefined(captionLinkTexts) || !isDefined(captionLinks)) {
      return caption
    }

    if (
      isDefined(captionLinks) &&
      isDefined(captionLinkTexts) &&
      captionLinks.length !== captionLinkTexts.length
    ) {
      throw new Error("キャプションリンク情報が不正です")
    }

    if (!isDefined(caption)) {
      return
    }

    const parts = []
    let currentIndex = 0

    captionLinkTexts.forEach((text, index) => {
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

  return (
    <figure className={clsx(styles.imageTag, figureClassName)}>
      <img
        // TODO: 画像押下の場合は画像拡大モーダルを開くようにするかどうか要検討
        className={clsx(styles.image, objectFitCover && styles.Covered, imgClassName)}
        src={src}
        {...props}
      />
      {isDefined(caption) && (
        <figcaption className={styles.caption}>
          {
            /** captionの中に含まれるcaptionLinkTextをLinkコンポーネントでラップし、同一インデックスのcaptionLinkLinksのアイテムをhrefに設定する */
            createLinkedCaption()
          }
        </figcaption>
      )}
    </figure>
  )
}
