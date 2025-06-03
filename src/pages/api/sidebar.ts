import type { SidebarApiResponse } from "@/types/api"
import type { APIRoute } from "astro"

export const prerender = false

/** サイドバーに表示するデーターをレスポンスする */
export const GET: APIRoute = ({ clientAddress }) => {
  /** IPアドレスがIPv4アドレスかどうかチェックする */
  const checkIsIPv4Address = (address: string) => {
    // ドットを3つ含むかどうかでIPv4アドレスかどうかを判定
    return address.split(".").length === 4
  }

  const isIPv4Address = checkIsIPv4Address(clientAddress)

  return new Response(
    JSON.stringify({
      date: new Date().toISOString(),
      isIPv4: isIPv4Address
    } satisfies SidebarApiResponse),
    {
      status: 200
    }
  )
}
