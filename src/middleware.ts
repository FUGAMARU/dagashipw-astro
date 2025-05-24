import { defineMiddleware } from "astro:middleware"

import { getArticle } from "@/services/api"
import { isValidString } from "@/utils"

export const onRequest = defineMiddleware(async (context, next) => {
  const { articleUrlId } = context.params

  if (!isValidString(articleUrlId)) {
    return next()
  }

  const article = await getArticle(articleUrlId)
  context.locals.article = article

  return next()
})
