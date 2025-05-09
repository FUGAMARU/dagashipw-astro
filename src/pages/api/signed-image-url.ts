import { isValidString } from "@/utils"
import { getLightweightImageUrl } from "@/utils/image"

import type { APIRoute } from "astro"

export const prerender = false

/** 署名されたCMS画像のURLをレスポンスする */
export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams
  const src = searchParams.get("src")

  if (!isValidString(src)) {
    return new Response("Image not found", {
      status: 404
    })
  }

  const signedSrc = getLightweightImageUrl(src)

  return new Response(signedSrc, {
    status: 200
  })
}
