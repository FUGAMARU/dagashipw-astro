import { createTimeline } from "animejs"
import { useRef, useState } from "react"

import {
  SHARE_BUTTONS_LINK_CIRCLE_BUTTON_ANIMATION_DURATION,
  SHARE_BUTTONS_LINK_CIRCLE_BUTTON_CHECK_ICON_DISPLAY_DURATION
} from "@/components/layout/sidebar/ShareButtons.helpers"
import styles from "@/components/layout/sidebar/ShareButtons.module.css"
import { Link } from "@/components/parts/common/Link"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { isDefined } from "@/utils"

import type { SvgComponentName } from "@/types/svg"

/** Props */
type Props = {
  /** 現在表示中の記事のURL */
  currentArticleUrl: string
  /** 現在表示中の記事のタイトル */
  currentArticleTitle: string
}

/** 記事シェア用ボタン */
export const ShareButtons = ({ currentArticleUrl, currentArticleTitle }: Props) => {
  /** 記事タイトルにサイト名を付与したもの */
  const currentArticleTitleWithSiteName = encodeURIComponent(
    `${currentArticleTitle} | 麩菓子の雑記帳`
  )

  // 参考: https://webdesign-trends.net/entry/3632
  const shareButtons = [
    {
      iconName: "snsX",
      shareUrl: `http://twitter.com/share?url=${currentArticleUrl}&text=${currentArticleTitleWithSiteName}`
    },
    {
      iconName: "snsFacebook",
      shareUrl: `https://www.facebook.com/share.php?u=${currentArticleUrl}`
    },
    {
      iconName: "snsLine",
      shareUrl: `http://line.me/R/msg/text/?${currentArticleUrl}%0a${currentArticleTitleWithSiteName}`
    },
    {
      iconName: "snsHatenaBookmark",
      shareUrl: `https://b.hatena.ne.jp/add?mode=confirm&url=${currentArticleUrl}&title=${currentArticleTitleWithSiteName}`
    }
  ] as const satisfies Array<{
    /** アイコン名 */
    iconName: SvgComponentName
    /** 共有用URL */
    shareUrl: string
  }>

  /** リンクコピーボタンのアニメーション中かどうか */
  const [isLinkButtonAnimating, setIsLinkButtonAnimating] = useState(false)

  const linkIconRef = useRef<HTMLDivElement>(null)
  const checkIconRef = useRef<HTMLDivElement>(null)

  /** LinkCircleButtonをクリックした時の処理 */
  const handleLinkCircleButtonClick = async () => {
    if (isLinkButtonAnimating) {
      return
    }

    setIsLinkButtonAnimating(true)

    await navigator.clipboard.writeText(currentArticleUrl)

    const linkIcon = linkIconRef.current
    const checkIcon = checkIconRef.current
    if (!isDefined(linkIcon) || !isDefined(checkIcon)) {
      return
    }

    const timeline = createTimeline({
      defaults: {
        ease: "linear", // フェードアニメーションの場合に最も適切なイージングはlinearなので定数化しない
        duration: SHARE_BUTTONS_LINK_CIRCLE_BUTTON_ANIMATION_DURATION
      }
    })

    timeline
      .add(linkIcon, {
        opacity: 0
      })
      .add(checkIcon, {
        opacity: 1
      })
      .add(checkIcon, {
        opacity: 0,
        delay: SHARE_BUTTONS_LINK_CIRCLE_BUTTON_CHECK_ICON_DISPLAY_DURATION
      })
      .add(linkIcon, {
        opacity: 1,
        /** アニメーションが完了した時の処理 */
        onComplete: () => {
          setIsLinkButtonAnimating(false)
        }
      })
  }

  /** リンクアイコンのボタン */
  const LinkCircleButton = () => {
    return (
      <button
        className={styles.linkCircleButton}
        onClick={handleLinkCircleButtonClick}
        type="button"
      >
        <div className={styles.iconStyle}>
          <div className={styles.linkIcon}>
            <SvgLoader ref={linkIconRef} className={styles.iconStyle} name="linkCircle" />
          </div>

          <div ref={checkIconRef} className={styles.checkIcon}>
            <SvgLoader className={styles.icon} name="check" />
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className={styles.shareButtons}>
      {shareButtons.map(({ iconName, shareUrl }) => (
        <Link key={iconName} href={shareUrl}>
          <SvgLoader className={styles.iconStyle} name={iconName} />
        </Link>
      ))}
      <LinkCircleButton />
    </div>
  )
}
