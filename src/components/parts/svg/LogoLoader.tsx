import { useEffect, useRef, type ReactNode } from "react"
import { createRoot } from "react-dom/client"

import LogoFull from "@/components/parts/svg/LogoFull"

import type { SvgProps } from "@/types/svg"

type Props = SvgProps

/**
 * ブログロゴ表示用コンポーネント
 * (SVG内で使用しているクラス名などがグローバル汚染で衝突するのでShadow DOMを使用している)
 * @param props Props
 * @returns ReactNode
 */
const SvgLoader = (props: Props): ReactNode => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (container === null) {
      return
    }

    const shadowRoot = container.attachShadow({ mode: "open" })

    const spanElement = document.createElement("span")
    shadowRoot.appendChild(spanElement)
    const root = createRoot(spanElement)
    root.render(<LogoFull {...props} />)

    return (): void => {
      root.unmount()
      shadowRoot.removeChild(spanElement)
    }
  }, [props])

  return <div ref={containerRef} />
}

export default SvgLoader
