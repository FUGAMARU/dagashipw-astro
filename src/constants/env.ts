/**
 * @file 環境変数を利用するための中間定数群
 */

import { isDefined, isServerSide, isValidString } from "@/utils"

/** APIオリジン */
export const API_ORIGIN = import.meta.env.API_ORIGIN
/** APIトークン */
export const API_TOKEN = import.meta.env.API_TOKEN
/** CMSが配信している静的ファイルのディレクトリ */
export const CMS_STATIC_CONTENTS_DIRECTORY = import.meta.env.CMS_STATIC_CONTENTS_DIRECTORY
/** imgproxyオリジン */
export const IMGPROXY_ORIGIN = import.meta.env.IMGPROXY_ORIGIN
/** imgproxyの署名URL生成用キー */
export const IMGPROXY_SIGNING_KEY = import.meta.env.IMGPROXY_SIGNING_KEY
/** imgproxyの署名URL生成用ソルト */
export const IMGPROXY_SIGNING_SALT = import.meta.env.IMGPROXY_SIGNING_SALT

if (isServerSide && [API_ORIGIN, API_TOKEN].some(value => !isValidString(value))) {
  const missingEnvironmentVariables = [
    !isValidString(API_ORIGIN) && "API_ORIGINが環境変数に設定されていません",
    !isValidString(API_TOKEN) && "API_TOKENが環境変数に設定されていません",
    !isValidString(CMS_STATIC_CONTENTS_DIRECTORY) &&
      "CMS_STATIC_CONTENTS_DIRECTORYが環境変数に設定されていません",
    !isValidString(IMGPROXY_ORIGIN) && "IMGPROXY_ORIGINが環境変数に設定されていません",
    !isValidString(IMGPROXY_SIGNING_KEY) && "IMGPROXY_SIGNING_KEYが環境変数に設定されていません",
    !isValidString(IMGPROXY_SIGNING_SALT) && "IMGPROXY_SIGNING_SALTが環境変数に設定されていません"
  ]
    .filter(isDefined)
    .join("\n")

  throw new Error(missingEnvironmentVariables)
}
