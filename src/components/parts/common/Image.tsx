import { createHmac } from "node:crypto"

import clsx from "clsx"
import { capitalize } from "es-toolkit"

import styles from "@/components/parts/common/Image.module.css"
import { ImageCaption } from "@/components/parts/ImageCaption"
import {
  API_ORIGIN,
  CMS_STATIC_CONTENTS_DIRECTORY,
  IMGPROXY_ORIGIN,
  IMGPROXY_SIGNING_KEY,
  IMGPROXY_SIGNING_SALT
} from "@/constants/env"
import { isDefined } from "@/utils"

import type { ComponentProps } from "react"

/**
 * CMSのオリジナル画像URLから軽量化された画像URLを取得する
 * TODO: node:cryptoのcreateHmacを使っているため、CSRするコンポーネントでImageコンポーネントを使おうとすると詰むので対応する必要がある。対応する場合はAstroに画像URL取得用のAPIを設ける必要がありそう。
 *
 * @param originalImageUrl - オリジナル画像のURL
 * @returns 軽量化された画像のURL
 */
export const getLightweightImageUrl = (originalImageUrl: string): string => {
  // 拡張子がwebpの場合は既に軽量化されている画像なのでそのまま返す
  if (originalImageUrl.endsWith(".webp")) {
    return originalImageUrl
  }

  const filename = originalImageUrl.replace(`${API_ORIGIN}${CMS_STATIC_CONTENTS_DIRECTORY}/`, "")
  const path = `/default/plain/local:///${filename}`

  /** HexをBufferにデコードする */
  const decodeHexToBuffer = (hex: string) => new Uint8Array(Buffer.from(hex, "hex"))

  const hmac = createHmac("sha256", decodeHexToBuffer(IMGPROXY_SIGNING_KEY))
  hmac.update(decodeHexToBuffer(IMGPROXY_SIGNING_SALT))
  hmac.update(path)
  const signature = hmac.digest("base64url")

  return `${IMGPROXY_ORIGIN}/${signature}${path}`
}

/** Props */
type Props = Omit<ComponentProps<"img">, "className" | "loading"> &
  Partial<ComponentProps<typeof ImageCaption>> & {
    /** 画像を即時読み込みするかどうか */
    isEager?: boolean
    /** object-fir: cover指定かどうか */
    isObjectFitCover?: boolean
    /** 円形画像かどうか */
    isCircle?: boolean
    /** CSSで指定するwidth */
    cssWidth?: "full" | "auto"
    /** CSSで指定するheight */
    cssHeight?: "full" | "auto"
    /** maxHeightを100%にするかどうか */
    isMaxHeight100?: boolean
    /** アスペクト比を16:9にするかどうか */
    isWide?: boolean
    /** border-radiusの値 */
    borderRadius?: "16" | "0"
    /** align */
    align?: "start" | "right" | "end"
    /** figureタグに充てるclassName */
    figureTagClassName?: string
    /** HeightAdjustedImageコンポーネントからの呼び出しかどうか */
    isHeightAdjustedImage?: boolean
  }

/** 画像コンポーネント */
export const Image = ({
  src,
  caption,
  captionLinkTexts,
  captionLinks,
  isEager = false,
  isObjectFitCover = false,
  isCircle = false,
  cssWidth,
  cssHeight,
  isMaxHeight100 = false,
  isWide = false,
  borderRadius,
  align = "start",
  figureTagClassName,
  isHeightAdjustedImage = false,
  ...props
}: Props) => {
  if (!isDefined(src)) {
    return <span>NoImage</span>
  }

  return (
    <figure
      className={clsx(
        styles.imageTag,
        isDefined(align) && styles[`Align${capitalize(align)}`],
        figureTagClassName
      )}
    >
      <img
        // TODO: 画像押下の場合は画像拡大モーダルを開くようにするかどうか要検討
        className={clsx(
          styles.image,
          isObjectFitCover && styles.Covered,
          isCircle && styles.Circle,
          isDefined(cssWidth) && styles[`Width${capitalize(cssWidth)}`],
          isDefined(cssHeight) && styles[`Height${capitalize(cssHeight)}`],
          isMaxHeight100 && styles.MaxHeight100,
          isWide && styles.Wide,
          isDefined(borderRadius) && styles[`BorderRadius${borderRadius}`]
        )}
        loading={isEager ? "eager" : "lazy"}
        src={getLightweightImageUrl(src)}
        {...props}
      />

      {isDefined(caption) && !isHeightAdjustedImage && (
        <ImageCaption
          caption={caption}
          captionLinks={captionLinks}
          captionLinkTexts={captionLinkTexts}
        />
      )}
    </figure>
  )
}
