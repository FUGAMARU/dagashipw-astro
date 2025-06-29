/** 悲しい絵文字一覧 */
const SAD_EMOJIS = [
  "😢",
  "😭",
  "😔",
  "😞",
  "😟",
  "🙁",
  "☹️",
  "🫠",
  "🤯",
  "😿",
  "💔",
  "😩",
  "😫",
  "😖",
  "😣",
  "😰",
  "😨",
  "😱",
  "🥺",
  "😤",
  "😠",
  "😵",
  "😵‍💫",
  "🤕",
  "🤒",
  "🙄",
  "😮‍💨",
  "🤐"
] as const

/**
 * ランダムな悲しい絵文字を1つ返す
 *
 * @returns 悲しい絵文字
 */
export const pickSadEmoji = (): string => {
  const randomIndex = Math.floor(Math.random() * SAD_EMOJIS.length)
  return SAD_EMOJIS[randomIndex]
}
