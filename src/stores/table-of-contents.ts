/**
 * @file 目次データーを管理するストア
 */

import { atom } from "nanostores"

import type { TableOfContentsData } from "@/types/table-of-contents"

/** 目次データー */
export const tableOfContentsAtom = atom<TableOfContentsData>([])
