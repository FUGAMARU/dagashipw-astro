import { animate } from "animejs"
import clsx from "clsx"
import { useRef, useEffect } from "react"

import { ResponsiveContainer } from "@/components/parts/common/ResponsiveContainer"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { COMMENT_POST_BUTTON_FADE_DURATION } from "@/components/templates/CommentPostButton.helpers"
import styles from "@/components/templates/CommentPostButton.module.css"
import { isDefined } from "@/utils"

import type { ComponentProps } from "react"

/** Props */
type Props = Pick<ComponentProps<"button">, "type" | "onClick" | "disabled"> & {
  /** POST中かどうか */
  isPosting?: boolean
}

/** コメント投稿ボタン */
export const CommentPostButton = ({
  type,
  onClick: handleClick,
  disabled = false,
  isPosting = false
}: Props) => {
  const spinnerRef = useRef<HTMLSpanElement>(null)
  const iconTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spinner = spinnerRef.current
    const iconText = iconTextRef.current

    if (!isDefined(spinner) || !isDefined(iconText)) {
      return
    }

    if (isPosting) {
      animate(iconText, {
        opacity: 0,
        duration: COMMENT_POST_BUTTON_FADE_DURATION,
        easing: "linear"
      })
      animate(spinner, {
        opacity: 1,
        duration: COMMENT_POST_BUTTON_FADE_DURATION,
        easing: "linear"
      })
      return
    }

    animate(spinner, {
      opacity: 0,
      duration: COMMENT_POST_BUTTON_FADE_DURATION,
      easing: "linear"
    })
    animate(iconText, {
      opacity: 1,
      duration: COMMENT_POST_BUTTON_FADE_DURATION,
      easing: "linear"
    })
  }, [isPosting])

  return (
    <button
      className={clsx(styles.commentPostButton, (disabled || isPosting) && styles.Disabled)}
      disabled={disabled || isPosting}
      onClick={handleClick}
      type={type}
    >
      <ResponsiveContainer>
        <SvgLoader className={styles.iconStyle} name="penPlus" />
      </ResponsiveContainer>

      <ResponsiveContainer isPC>
        <div className={styles.pcContents}>
          <span ref={spinnerRef} className={styles.spinner}>
            <SvgLoader className={styles.iconStyle} name="spinner" />
          </span>

          <div ref={iconTextRef} className={styles.initial}>
            <SvgLoader className={styles.iconStyle} name="penPlus" />
            <span className={styles.text}>コメントを残す</span>
          </div>
        </div>
      </ResponsiveContainer>
    </button>
  )
}
