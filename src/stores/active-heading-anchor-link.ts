/**
 * @file 現在読んでいるセクションの見出しIDを管理するストア
 */

import { atom, computed } from "nanostores"

import { tableOfContentsAtom } from "@/stores/table-of-contents"

/** 現在読んでいるセクションの見出しアンカーリンク */
export const activeHeadingAnchorLinkAtom = atom<string | undefined>()

/** 現在読んでいるセクションの見出しアンカーリンクの初期値を記事中で最初に登場するh2としたもの */
export const activeHeadingAnchorLinkWithInitialValueAtom = computed(
  [tableOfContentsAtom, activeHeadingAnchorLinkAtom],
  (tableOfContents, activeHeadingAnchorLink) =>
    activeHeadingAnchorLink ?? tableOfContents[0]?.h2?.href
)
