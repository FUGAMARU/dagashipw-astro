import anime from "animejs"
import clsx from "clsx"
import { useCallback, useRef, useState } from "react"

import styles from "@/components/article/originals/AccordionInfo.module.css"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { useIsSP } from "@/hooks/useIsSP"
import { isDefined } from "@/utils/isDefined"

import type { SvgComponentName } from "@/types/svg"
import type { MouseEvent } from "react"

/** 共通イージングスタイル */
const EASING_STYLE = "cubicBezier(0.77,0,0.18,1)"

/** 表示タイプ一覧 */
type DisplayType = "tips" | "warning"

/**
 * 表示タイプごとのリソース定義
 *
 * @see アイコン色 https://developer.apple.com/design/human-interface-guidelines/color
 */
const RESOURCES_BY_DISPLAY_TYPE = {
  tips: {
    iconName: "inspiration",
    iconColor: "#ffcc00",
    label: "Tips"
  },
  warning: {
    iconName: "warning",
    iconColor: "#ff9500",
    label: "Warning"
  }
} as const satisfies Record<
  DisplayType,
  {
    /** アイコン名 */
    iconName: SvgComponentName
    /** アイコン色 */
    iconColor: string
    /** ラベル */
    label: string
  }
>

/** Props */
type Props = {
  /** 表示タイプ */
  displayType: DisplayType
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
  const handleTitleClick = useCallback(
    (e: MouseEvent) => {
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
        anime({
          targets: bodyText,
          opacity: 0,
          duration: 400,
          easing: "linear"
        })

        anime({
          targets: body,
          opacity: 0,
          duration: 400,
          delay: 300,
          easing: "linear"
        })

        anime({
          targets: body,
          height: 0,
          duration: 700,
          delay: 300,
          easing: EASING_STYLE
        })

        anime({
          targets: triangleIcon,
          rotate: 0,
          delay: 300,
          duration: 700,
          easing: EASING_STYLE,
          /** アニメーションが完了した時に発火するコールバック */
          complete: () => {
            setIsAccordionOpen(false)
          }
        })

        return
      }

      anime({
        targets: triangleIcon,
        rotate: 180,
        duration: 700,
        easing: EASING_STYLE
      })

      anime({
        targets: body,
        height: hiddenBody.scrollHeight + paddingSize * 2, // 垂直方向のpaddingの分をプラスしている
        duration: 700,
        easing: EASING_STYLE
      })

      anime({
        targets: body,
        opacity: 1,
        duration: 400,
        delay: 100,
        easing: "linear"
      })

      anime({
        targets: bodyText,
        opacity: 1,
        duration: 400,
        delay: 600,
        easing: "linear"
      })

      setIsAccordionOpen(true)
    },
    [isAccordionOpen, isSP]
  )

  return (
    <div className={styles.accordionInfo}>
      <details className={styles.main} onClick={handleTitleClick} open={isAccordionOpen}>
        <summary className={styles.title}>
          <div
            className={styles.left}
            style={{
              fill: RESOURCES_BY_DISPLAY_TYPE[displayType].iconColor
            }}
          >
            <SvgLoader
              height={18}
              name={RESOURCES_BY_DISPLAY_TYPE[displayType].iconName}
              width={18}
            />
            <span
              className={styles.label}
              style={{
                borderColor: RESOURCES_BY_DISPLAY_TYPE[displayType].iconColor
              }}
            >
              {RESOURCES_BY_DISPLAY_TYPE[displayType].label}
            </span>
            <span className={styles.title}>{title}</span>
          </div>

          <span ref={triangleIconRef} className={styles.icon}>
            <SvgLoader height={8} name="roundedTriangleDown" width={8} />
          </span>
        </summary>

        <div ref={bodyRef} className={styles.sectionBody}>
          <p ref={bodyTextRef} className={styles.text}>
            {body}
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
