/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { Article } from "@/types/api"

declare module "*.css"

declare global {
  namespace App {
    interface Locals {
      article?: Article
    }
  }
}
