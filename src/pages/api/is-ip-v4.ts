import type { APIRoute } from "astro"

export const prerender = false

/** このAPIにアクセスしてきたクライアントがIPv4でアクセスしてきたのかIPv6でアクセスしてきたのかを返す */
export const GET: APIRoute = ({ clientAddress }) => {
  /** IPアドレスがIPv4アドレスかどうかチェックする */
  const checkIsIPv4Address = (address: string) => {
    // ドットを3つ含むかどうかでIPv4アドレスかどうかを判定
    return address.split(".").length === 4
  }

  const isIPv4Address = checkIsIPv4Address(clientAddress)

  return new Response(JSON.stringify(isIPv4Address), {
    status: 200
  })
}
