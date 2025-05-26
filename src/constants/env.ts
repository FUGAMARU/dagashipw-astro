/**
 * @file 環境変数を利用するための中間定数群
 */

import { isDefined, isServerSide, isValidString } from "@/utils"

/** サイトオリジン */
export const SITE_ORIGIN = import.meta.env.SITE_ORIGIN
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
/**
 * Cloudflare Turnstileのサイトキー
 * ダミーのサイトキーに関しては以下を参照
 *
 * @see https://developers.cloudflare.com/turnstile/troubleshooting/testing/
 */
export const TURNSTILE_SITE_KEY = import.meta.env.DEV
  ? "1x00000000000000000000AA"
  : import.meta.env.PUBLIC_TURNSTILE_SITE_KEY
/** Cloudflare Turnstileのシークレットキー */
export const TURNSTILE_SECRET_KEY = import.meta.env.TURNSTILE_SECRET_KEY

if (isServerSide && [API_ORIGIN, API_TOKEN].some(value => !isValidString(value))) {
  const missingEnvironmentVariables = [
    !isValidString(SITE_ORIGIN) && "SITE_ORIGINが環境変数に設定されていません",
    !isValidString(API_ORIGIN) && "API_ORIGINが環境変数に設定されていません",
    !isValidString(API_TOKEN) && "API_TOKENが環境変数に設定されていません",
    !isValidString(CMS_STATIC_CONTENTS_DIRECTORY) &&
      "CMS_STATIC_CONTENTS_DIRECTORYが環境変数に設定されていません",
    !isValidString(IMGPROXY_ORIGIN) && "IMGPROXY_ORIGINが環境変数に設定されていません",
    !isValidString(IMGPROXY_SIGNING_KEY) && "IMGPROXY_SIGNING_KEYが環境変数に設定されていません",
    !isValidString(IMGPROXY_SIGNING_SALT) && "IMGPROXY_SIGNING_SALTが環境変数に設定されていません",
    !isValidString(TURNSTILE_SITE_KEY) && "TURNSTILE_SITE_KEYが環境変数に設定されていません",
    !isValidString(TURNSTILE_SECRET_KEY) && "TURNSTILE_SECRET_KEYが環境変数に設定されていません"
  ]
    .filter(isDefined)
    .join("\n")

  throw new Error(missingEnvironmentVariables)
}
