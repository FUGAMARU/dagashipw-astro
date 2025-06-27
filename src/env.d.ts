/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { CalculatedArticle } from "@/types/api"

declare module "*.css"

declare global {
  namespace App {
    interface Locals {
      article?: CalculatedArticle
    }
  }
}
