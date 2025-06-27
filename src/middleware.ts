import { defineMiddleware } from "astro:middleware"

import { DEVELOPMENT_ARTICLE_URL_ID } from "@/constants/env"
import { getArticle } from "@/services/api"
import { isValidString } from "@/utils"

export const onRequest = defineMiddleware(async (context, next) => {
  const { articleUrlId } = context.params

  if (!isValidString(articleUrlId)) {
    return next()
  }

  if (import.meta.env.PROD && articleUrlId === DEVELOPMENT_ARTICLE_URL_ID) {
    return new Response(null, { status: 404 })
  }

  const article = await getArticle(articleUrlId)
  context.locals.article = article

  return next()
})
