/**
 * @file 現在読んでいるセクションの見出しIDを管理するストア
 */

import { atom } from "nanostores"

/** 現在読んでいるセクションの見出しアンカーリンク */
export const activeHeadingAnchorLinkAtom = atom<string | undefined>()
