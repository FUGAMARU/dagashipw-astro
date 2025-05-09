import { ArticleCardMini } from "@/components/parts/card/ArticleCardMini"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ArticleCardMini> = {
  component: ArticleCardMini,
  tags: ["autodocs"],
  args: {
    articleUrlId: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    thumbnailUrl: undefined,
    themeColor: undefined,
    title: undefined
  },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    articleUrlId: "sea-candle",
    createdAt: "2022-12-30T00:00:00Z",
    updatedAt: "2022-12-31T00:00:00Z",
    thumbnailUrl: "/dummy-images/sea-candle.jpg",
    themeColor: "#6b33bf",
    title: "江ノ島シーキャンドル"
  }
}
