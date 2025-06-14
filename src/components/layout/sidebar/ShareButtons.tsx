import { useCallback } from "react"

import styles from "@/components/layout/sidebar/ShareButtons.module.css"
import { Link } from "@/components/parts/common/Link"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"

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
  // 参考: https://webdesign-trends.net/entry/3632
  const shareButtons = [
    {
      iconName: "snsX",
      shareUrl: `http://twitter.com/share?url=${currentArticleUrl}&text=${currentArticleTitle}`
    },
    {
      iconName: "snsFacebook",
      shareUrl: `https://www.facebook.com/share.php?u=${currentArticleUrl}`
    },
    {
      iconName: "snsLine",
      shareUrl: `http://line.me/R/msg/text/?${currentArticleUrl}%0a${currentArticleTitle}`
    },
    {
      iconName: "snsHatenaBookmark",
      shareUrl: `https://b.hatena.ne.jp/add?mode=confirm&url=${currentArticleUrl}&title=${currentArticleTitle}`
    }
  ] as const satisfies Array<{
    /** アイコン名 */
    iconName: SvgComponentName
    /** 共有用URL */
    shareUrl: string
  }>

  /** LinkCircleButtonをクリックした時の処理 */
  const handleLinkCircleButtonClick = useCallback(async () => {
    await navigator.clipboard.writeText(currentArticleUrl)
  }, [currentArticleUrl])

  /** リンクアイコンのボタン */
  const LinkCircleButton = useCallback(() => {
    return (
      <button onClick={handleLinkCircleButtonClick} type="button">
        <SvgLoader className={styles.iconStyle} name="linkCircle" />
      </button>
    )
  }, [handleLinkCircleButtonClick])

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
