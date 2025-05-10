import { animate } from "animejs"
import clsx from "clsx"
import { useRef, useState } from "react"

import {
  ACCORDION_INFO_COMMON_EASING_STYLE,
  ACCORDION_INFO_RESOURCES_BY_DISPLAY_TYPE
} from "@/components/article/originals/AccordionInfo.helpers"
import styles from "@/components/article/originals/AccordionInfo.module.css"
import { LinkInArticle } from "@/components/article/standards/LinkInArticle"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { useIsSP } from "@/hooks/useIsSP"
import { isDefined } from "@/utils"
import { unescapeNewlines } from "@/utils/formatter"

import type { AccordionInfoDisplayType } from "@/components/article/originals/AccordionInfo.helpers"
import type { MouseEvent, ReactNode } from "react"

/** Props */
type Props = {
  /** 表示タイプ */
  displayType: AccordionInfoDisplayType
  /** タイトル */
  title: string
  /** 本文 */
  body: string
}

/** アコーディオンで情報を表示するコンポーネント */
export const AccordionInfo = ({ displayType, title, body }: Props) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const isSP = useIsSP()

  const bodyRef = useRef<HTMLDivElement>(null)
  const hiddenBodyRef = useRef<HTMLDivElement>(null)
  const bodyTextRef = useRef<HTMLParagraphElement>(null)
  const triangleIconRef = useRef<HTMLSpanElement>(null)

  /** タイトルをクリックした時の処理 */
  const handleTitleClick = (e: MouseEvent) => {
    e.preventDefault() // detailsタグのデフォルトの動作があるのでpreventDefaultしないとアニメーションが効かない

    const body = bodyRef.current
    const hiddenBody = hiddenBodyRef.current
    const bodyText = bodyTextRef.current
    const triangleIcon = triangleIconRef.current

    if (
      !isDefined(body) ||
      !isDefined(hiddenBody) ||
      !isDefined(bodyText) ||
      !isDefined(triangleIcon)
    ) {
      return
    }

    const paddingSize = isSP ? 16 : 32

    if (isAccordionOpen) {
      animate(bodyText, {
        opacity: 0,
        duration: 400,
        ease: "linear"
      })

      animate(body, {
        opacity: 0,
        duration: 400,
        delay: 300,
        ease: "linear"
      })

      animate(body, {
        height: 0,
        duration: 700,
        delay: 300,
        ease: ACCORDION_INFO_COMMON_EASING_STYLE
      })

      animate(triangleIcon, {
        rotate: 0,
        delay: 300,
        duration: 700,
        ease: ACCORDION_INFO_COMMON_EASING_STYLE,
        /** アニメーションが完了した時に発火するコールバック */
        onComplete: () => {
          setIsAccordionOpen(false)
        }
      })

      return
    }

    animate(triangleIcon, {
      rotate: 180,
      duration: 700,
      ease: ACCORDION_INFO_COMMON_EASING_STYLE
    })

    animate(body, {
      height: hiddenBody.scrollHeight + paddingSize * 2, // 垂直方向のpaddingの分をプラスしている
      duration: 700,
      ease: ACCORDION_INFO_COMMON_EASING_STYLE
    })

    animate(body, {
      opacity: 1,
      duration: 400,
      delay: 100,
      ease: "linear"
    })

    animate(bodyText, {
      opacity: 1,
      duration: 400,
      delay: 600,
      ease: "linear"
    })

    setIsAccordionOpen(true)
  }

  /** bodyをパースしてMarkdownのリンク記法のstringがあれば実際にLinkInArticleコンポーネントに置き換える */
  const parseMarkdownLinks = (text: string) => {
    const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g

    return text.split(regex).reduce<Array<string | ReactNode>>((acc, part, index, arr) => {
      // 0: テキスト部分, 1: リンクテキスト, 2: リンクURL
      if (index % 3 === 0) {
        acc.push(part)
      } else if (index % 3 === 1) {
        acc.push(
          <LinkInArticle key={index} href={arr[index + 1]}>
            {part}
          </LinkInArticle>
        )
      }
      return acc
    }, [])
  }

  return (
    <div className={styles.accordionInfo}>
      <details className={styles.main} open={isAccordionOpen}>
        <summary className={styles.title} onClick={handleTitleClick}>
          <div
            className={styles.left}
            style={{
              fill: ACCORDION_INFO_RESOURCES_BY_DISPLAY_TYPE[displayType].iconColor
            }}
          >
            <SvgLoader
              height={18}
              name={ACCORDION_INFO_RESOURCES_BY_DISPLAY_TYPE[displayType].iconName}
              width={18}
            />
            <span
              className={styles.label}
              style={{
                borderColor: ACCORDION_INFO_RESOURCES_BY_DISPLAY_TYPE[displayType].iconColor
              }}
            >
              {ACCORDION_INFO_RESOURCES_BY_DISPLAY_TYPE[displayType].label}
            </span>
            <span className={styles.title}>{title}</span>
          </div>

          <span ref={triangleIconRef} className={styles.icon}>
            <SvgLoader height={8} name="roundedTriangleDown" width={8} />
          </span>
        </summary>

        <div ref={bodyRef} className={styles.sectionBody}>
          <p ref={bodyTextRef} className={styles.text}>
            {parseMarkdownLinks(unescapeNewlines(body))}
          </p>
        </div>
      </details>

      {/* Safariにおいて、要素の初期スタイルとしてheight: 0が指定されているとアコーディオンを開く時に要素のscrollHeightが0になってしまいアニメーションの最終地点が取得できなくなるので、高さ計算用にダミーの要素を設けている */}
      <div ref={hiddenBodyRef} className={clsx(styles.sectionBody, styles.hiddenElement)}>
        <p className={styles.text}>{body}</p>
      </div>
    </div>
  )
}
