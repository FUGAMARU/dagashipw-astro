import { useEffect, useRef } from "react"
import { createRoot } from "react-dom/client"

import { LogoFull } from "@/components/parts/svg/LogoFull"

import type { SvgProps } from "@/types/svg"

/**
 * ブログロゴ表示用コンポーネント
 * (SVG内で使用しているクラス名などがグローバル汚染で衝突するのでShadow DOMを使用している)
 */
export const LogoLoader = (props: SvgProps) => {
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

    return () => {
      root.unmount()
      shadowRoot.removeChild(spanElement)
    }
  }, [props])

  return <div ref={containerRef} />
}
