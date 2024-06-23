import { useSyncExternalStore, type ComponentProps } from "react"

import { SESSION_STORAGE_TABLE_OF_CONTENTS_KEY } from "@/constants/value"
import { isDefined } from "@/utils/isDefined"

import type TableOfContents from "@/components/templates/TableOfContents"

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback)

  return (): void => {
    window.removeEventListener("storage", callback)
  }
}

/**
 * 目次データーを準備するためのHooks
 * 参考: https://zenn.dev/yami_beta/articles/ad209be154945f
 * @returns 目次データー
 */
const useTableOfContents = (): ComponentProps<typeof TableOfContents>["contents"] | undefined => {
  const sessionStorageData = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem(SESSION_STORAGE_TABLE_OF_CONTENTS_KEY),
    () => undefined // SSR時のスナップショット (Hydration前)
  )

  if (!isDefined(sessionStorageData)) {
    return undefined
  }

  return JSON.parse(sessionStorageData)
}

export default useTableOfContents
