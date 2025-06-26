import { ArticleCardMini } from "@/components/parts/card/ArticleCardMini"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ArticleCardMini> = {
  component: ArticleCardMini,
  tags: ["autodocs"],
  args: { isFallback: undefined },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ArticleCardMini>

export const Primary: Story = {
  args: {
    articleUrlId: "sea-candle",
    createdAt: "2022-12-30T00:00:00Z",
    updatedAt: "2022-12-31T00:00:00Z",
    thumbnail: {
      pc1x: "/dummy-images/sea-candle.jpg",
      pc2x: "/dummy-images/sea-candle.jpg",
      sp1x: "/dummy-images/sea-candle.jpg",
      sp2x: "/dummy-images/sea-candle.jpg"
    },
    themeColor: "#6b33bf",
    title: "江ノ島シーキャンドル"
  }
}

export const Fallback: Story = {
  args: {
    isFallback: true
  }
}
