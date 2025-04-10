import { createTimeline } from "animejs"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import root from "react-shadow"
import { codeToHtml } from "shiki"

import {
  CHECK_ICON_DISPLAY_DURATION,
  COPY_ICON_FADE_ANIMATION_DURATION,
  getLanguageInfo
} from "@/components/article/originals/CodeBlock.helpers"
import styles from "@/components/article/originals/CodeBlock.module.css"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { isDefined } from "@/utils"

import type { SvgComponentName } from "@/types/svg"

/** Props */
type Props = {
  /** 言語 */
  language: string
  /** コード */
  code: string
}

/** コードをシンタックスハイライト付きで表示するコンポーネント */
export const CodeBlock = ({ language, code }: Props) => {
  const [html, setHtml] = useState("")
  const [copyButtonIconName, setCopyButtonIconName] =
    useState<Extract<SvgComponentName, "copy" | "checkCircle">>("copy")
  const copyIconRef = useRef<HTMLSpanElement>(null)

  const { label, isLabelWhite, backgroundColor } = getLanguageInfo(language)

  /** コピーするボタンを押下した時の処理 */
  const handleCopyButtonClick = async () => {
    await navigator.clipboard.writeText(code)

    const timeline = createTimeline({
      defaults: {
        ease: "linear", // フェードアニメーションの場合に最も適切なイージングはlinearなので定数化しない
        duration: COPY_ICON_FADE_ANIMATION_DURATION
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
        delay: CHECK_ICON_DISPLAY_DURATION,
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
        lang: language,
        theme: "monokai"
      })

      setHtml(htmlFromCode)
    })()
  })

  return (
    <div className={styles.codeBlock}>
      <div className={styles.header}>
        <div className={styles.language} style={{ backgroundColor }}>
          <span className={clsx(styles.text, isLabelWhite && styles.White)}>{label}</span>
        </div>

        <button onClick={handleCopyButtonClick} type="button">
          <span
            ref={copyIconRef}
            className={clsx(copyButtonIconName === "checkCircle" && styles.checkCircleIcon)}
          >
            <SvgLoader height={17} name={copyButtonIconName} width={16} />
          </span>
        </button>
      </div>

      <root.div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <style>
          {`
            code {
              font-family: "HackGen35", monospace;
              font-size: 14px;
              line-height: 1.4;
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
          `}
        </style>
      </root.div>
      <div className={styles.footer} />
    </div>
  )
}
