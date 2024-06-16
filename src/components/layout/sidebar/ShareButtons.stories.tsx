import ShareButtons from "@/components/layout/sidebar/ShareButtons"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ShareButtons> = {
  component: ShareButtons,
  tags: ["autodocs"],
  args: { currentArticleUrl: undefined, currentArticleTitle: undefined },
  argTypes: { currentArticleUrl: { control: "text" }, currentArticleTitle: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    currentArticleUrl: "https://dagashi.pw",
    currentArticleTitle: "ブログタイトル"
  }
}
