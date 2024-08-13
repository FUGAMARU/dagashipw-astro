import ArticleCard from "@/components/parts/card/ArticleCard"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ArticleCard> = {
  component: ArticleCard,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    thumbnail: "/sea-candle.jpg",
    createdAt: "2024/07/14",
    updatedAt: "2024/07/15",
    commentCount: 100,
    title: "記事タイトル",
    body: "記事概要文記事概要文記事概要文記事概要文記事概要文記事概要文記事概要文記事概要文",
    tags: ["Tag1", "Tag2", "Tag3"],
    articleUrlId: "test",
    backNumber: 1
  }
}
