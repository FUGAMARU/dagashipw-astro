import styles from "@/components/layout/sidebar/ShareButtons.module.css"
import Link from "@/components/parts/common/Link"
import SvgLoader from "@/components/parts/svg/SvgLoader"

import type { SvgComponentName } from "@/types/svg"
import type { ReactNode } from "react"

type Props = {
  /** 現在表示中の記事のURL */
  currentArticleUrl: string
  /** 現在表示中の記事のタイトル */
  currentArticleTitle: string
}

/**
 * 記事シェア用ボタン
 * @returns ReactNode
 */
const ShareButtons = ({ currentArticleUrl, currentArticleTitle }: Props): ReactNode => {
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
    iconName: SvgComponentName
    shareUrl: string
  }>

  /** LinkCircleButtonをクリックした時の処理 */
  const handleLinkCircleButtonClick = async (): Promise<void> => {
    await navigator.clipboard.writeText(currentArticleUrl)
  }

  const LinkCircleButton = (): ReactNode => {
    return (
      <button onClick={handleLinkCircleButtonClick} type="button">
        <SvgLoader height={32} name="linkCircle" width={32} />
      </button>
    )
  }

  return (
    <div className={styles.shareButtons}>
      {shareButtons.map(({ iconName, shareUrl }) => (
        <Link key={iconName} href={shareUrl}>
          <SvgLoader height={32} name={iconName} width={32} />
        </Link>
      ))}
      <LinkCircleButton />
    </div>
  )
}

export default ShareButtons
