import ArticleCardList from "@/components/templates/ArticleCardList"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ArticleCardList> = {
  component: ArticleCardList,
  tags: ["autodocs"],
  args: { articleInfoList: undefined },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    articleInfoList: Array.from({ length: 3 }, () => ({
      thumbnailUrl: "/sea-candle.jpg",
      createdAt: "2024/07/14",
      updatedAt: "2024/07/15",
      commentCount: 100,
      title: "記事タイトル",
      bodyBeginningParagraph:
        "記事概要文記事概要文記事概要文記事概要文記事概要文記事概要文記事概要文記事概要文",
      tags: ["Tag1", "Tag2", "Tag3"],
      articleUrlId: "test",
      backNumber: 1
    }))
  }
}
