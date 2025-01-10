import { memo, useEffect, useState } from "react"
import root from "react-shadow"
import { codeToHtml } from "shiki"

import styles from "@/components/article/originals/CodeBlock.module.css"

/** Props */
type Props = {
  /** 言語 */
  language: string
  /** コード */
  code: string
}

/** コードをシンタックスハイライト付きで表示するコンポーネント */
export const CodeBlock = memo(({ language, code }: Props) => {
  const [html, setHtml] = useState("")

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
      <div className={styles.language}>{language}</div>
      <root.div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <style type="text/css">
          {`
            code {
              counter-reset: step;
              counter-increment: step 0;
            }

            code .line::before {
              display: inline-block;
              margin: 0 1rem;
              color: var(--color-white);
              text-align: right;
              content: counter(step);
              counter-increment: step;
            }

            pre.shiki {
              margin: 0;
            }
          `}
        </style>
      </root.div>
    </div>
  )
})

CodeBlock.displayName = "CodeBlock"
