/**
 * @file 分類しにくい定数
 */

/** APIのベースURL */
export const STRAPI_BASE_URL = "https://strapi.dagashi.pw"
export const API_BASE_URL = `${STRAPI_BASE_URL}/api`

/** sessionStorageに記録する目次データーのキー */
export const SESSION_STORAGE_TABLE_OF_CONTENTS_KEY = "table-of-contents"

/** 記事本文の冒頭何文字を抜き出すか */
export const EXTRACTED_PARAGRAPHS_LENGTH = 200
