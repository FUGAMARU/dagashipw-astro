/**
 * 現在の日時をyyyy/MM/dd HH:mm:ssの形式で取得する
 * @returns yyyy/MM/dd HH:mm:ss
 */
export const getCurrentDateTime = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = `0${now.getMonth() + 1}`.slice(-2)
  const day = `0${now.getDate()}`.slice(-2)
  const hours = `0${now.getHours()}`.slice(-2)
  const minutes = `0${now.getMinutes()}`.slice(-2)
  const seconds = `0${now.getSeconds()}`.slice(-2)
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}
