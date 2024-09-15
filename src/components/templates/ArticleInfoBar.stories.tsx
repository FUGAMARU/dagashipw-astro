import { ArticleInfoBar } from "@/components/templates/ArticleInfoBar"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ArticleInfoBar> = {
  component: ArticleInfoBar,
  tags: ["autodocs"],
  args: {
    isWhiteStyle: undefined,
    isBorderHidden: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    commentCount: undefined
  },
  argTypes: { isWhiteStyle: { control: "boolean" }, isBorderHidden: { control: "boolean" } }
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

export const NoBorder: Story = {
  args: {
    createdAt: "2021/01/01",
    updatedAt: "2021/01/02",
    commentCount: 1,
    isBorderHidden: true
  }
}
