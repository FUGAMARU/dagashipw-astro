import ArticleImage from "@/components/article/originals/image/ArticleImage"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ArticleImage> = {
  component: ArticleImage,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    src: "/sea-candle.jpg"
  }
}
