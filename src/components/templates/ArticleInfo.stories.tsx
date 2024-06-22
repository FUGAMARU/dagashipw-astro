import ArticleInfo from "@/components/templates/ArticleInfo"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ArticleInfo> = {
  component: ArticleInfo,
  tags: ["autodocs"],
  args: {
    createdAt: undefined,
    updatedAt: undefined,
    commentCount: undefined,
    isWhiteStyle: undefined
  },
  argTypes: {
    createdAt: { control: "text" },
    updatedAt: { control: "text" },
    commentCount: { control: "number" },
    isWhiteStyle: { control: "boolean" }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    createdAt: "2021/01/01",
    updatedAt: "2021/01/02",
    commentCount: 1
  }
}
