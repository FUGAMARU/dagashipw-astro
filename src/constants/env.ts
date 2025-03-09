/**
 * @file 環境変数を利用するための中間定数群
 */

import { isDefined } from "@/utils/isDefined"

/** APIオリジン */
export const API_ORIGIN = process.env.API_ORIGIN
/** APIトークン */
export const API_TOKEN = process.env.API_TOKEN

if ([API_ORIGIN, API_TOKEN].some(value => !isDefined(value))) {
  const missingEnvironmentVariables = [
    !isDefined(API_ORIGIN) && "API_ORIGINが環境変数に設定されていません",
    !isDefined(API_TOKEN) && "API_TOKENが環境変数に設定されていません"
  ]
    .filter(isDefined)
    .join("\n")

  throw new Error(missingEnvironmentVariables)
}
