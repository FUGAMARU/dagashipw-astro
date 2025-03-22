/**
 * @file TableOfContentsのハイドレーションが完了したかどうかを管理するストア
 */

import { atom } from "nanostores"

/** TableOfContentsのハイドレーションが完了したかどうか */
export const isTocHydrationCompleteAtom = atom(false)
