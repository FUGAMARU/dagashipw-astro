import { createTimeline } from "animejs"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import root from "react-shadow"
import { codeToHtml } from "shiki"

import styles from "@/components/article/originals/CodeBlock.module.css"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { RESPONSIVE_SP_MAX_WIDTH } from "@/constants/value"
import { isDefined } from "@/utils"

import type { CodeBlockLanguageInfo } from "@/components/article/originals/CodeBlockWrapper.helpers"
import type { SvgComponentName } from "@/types/svg"

/** Props */
type Props = {
  /** 言語情報 */
  languageInfo: Omit<CodeBlockLanguageInfo, "keyword"> & {
    /** キーワード */
    keyword: string
    /** ラベルの文字色を白にするか */
    isLabelWhite: boolean
  }
  /** アニメーション情報 */
  animationInfo: {
    /** コピーアイコンのフェードアニメーションのDuration (ms) */
    copyIconFadeAnimationDuration: number
    /** コピーアイコン押下後チェックマークを表示している時間 (ms) */
    checkIconDisplayDuration: number
  }
  /** コード */
  code: string
}

/** コードをシンタックスハイライト付きで表示するコンポーネント */
export const CodeBlock = ({ languageInfo, animationInfo, code }: Props) => {
  const [html, setHtml] = useState("")
  const [copyButtonIconName, setCopyButtonIconName] =
    useState<Extract<SvgComponentName, "copy" | "checkCircle">>("copy")
  const copyIconRef = useRef<HTMLSpanElement>(null)

  /** コピーするボタンを押下した時の処理 */
  const handleCopyButtonClick = async () => {
    await navigator.clipboard.writeText(code) // TODO: iPhoneで押下した時にアニメーション発火しなかったので確認する必要ありそう

    const timeline = createTimeline({
      defaults: {
        ease: "linear", // フェードアニメーションの場合に最も適切なイージングはlinearなので定数化しない
        duration: animationInfo.copyIconFadeAnimationDuration
      }
    })

    const copyIcon = copyIconRef.current

    if (!isDefined(copyIcon)) {
      return
    }

    timeline
      .add(copyIcon, {
        opacity: 0,
        /** アニメーションが完了した時の処理 */
        onComplete: () => {
          setCopyButtonIconName("checkCircle")
        }
      })
      .add(copyIcon, {
        opacity: 1
      })
      .add(copyIcon, {
        opacity: 0,
        delay: animationInfo.checkIconDisplayDuration,
        /** アニメーションが完了した時の処理 */
        onComplete: () => {
          setCopyButtonIconName("copy")
        }
      })
      .add(copyIcon, {
        opacity: 1
      })
  }

  useEffect(() => {
    ;(async () => {
      const htmlFromCode = await codeToHtml(code, {
        lang: languageInfo.keyword,
        theme: "monokai"
      })

      setHtml(htmlFromCode)
    })()
  })

  return (
    <div className={styles.codeBlock}>
      <div className={styles.header}>
        <div className={styles.language} style={{ backgroundColor: languageInfo.themeColor }}>
          <span className={clsx(styles.text, languageInfo.isLabelWhite && styles.White)}>
            {languageInfo.label}
          </span>
        </div>

        <button className={styles.copy} onClick={handleCopyButtonClick} type="button">
          <SvgLoader
            ref={copyIconRef}
            className={clsx(styles.icon, copyButtonIconName === "checkCircle" && styles.Check)}
            name={copyButtonIconName}
          />
        </button>
      </div>

      <root.div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <style>
          {`
            code {
              font-family: "HackGen35", monospace;
              font-size: 12px;
              line-height: 1.45;
              counter-reset: step;
              counter-increment: step 0;
            }

            code .line::before {
              display: inline-block;
              width: 42px;
              margin-right: 10px;
              color: var(--color-text-gray);
              text-align: center;
              content: counter(step);
              counter-increment: step;
              border-right: solid 2px var(--color-codeblock-border);
            }

            pre.shiki {
              padding: 8px 0;
              margin: 0;
              overflow: auto;
              background-color: var(--color-codeblock-background) !important;
            }

            span {
              font-style: normal !important;
            }

            @media screen and (min-width:${RESPONSIVE_SP_MAX_WIDTH + 1}px) {
              code {
                font-size: 14px;
              }
            }
          `}
        </style>
      </root.div>
      <div className={styles.footer} />
    </div>
  )
}
