import { ArticleInfoBar } from "@/components/templates/ArticleInfoBar"

import type { Meta, StoryObj } from "@storybook/react-vite"

const meta: Meta<typeof ArticleInfoBar> = {
  component: ArticleInfoBar,
  tags: ["autodocs"],
  args: {
    isWhiteStyle: undefined,
    isBorderHidden: undefined,
    articleUrlId: undefined,
    createdAt: undefined,
    updatedAt: undefined
  },
  argTypes: { isWhiteStyle: { control: "boolean" }, isBorderHidden: { control: "boolean" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    articleUrlId: "example-article-id",
    createdAt: "2021/01/01",
    updatedAt: "2021/01/02"
  }
}

export const NoBorder: Story = {
  args: {
    articleUrlId: "example-article-id",
    createdAt: "2021/01/01",
    updatedAt: "2021/01/02",
    isBorderHidden: true
  }
}
