import LinkInArticle from "@/components/article/standards/LinkInArticle"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof LinkInArticle> = {
  component: LinkInArticle,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    href: "https://www.pa-works.jp/",
    children: "P.A.WORKS公式サイト"
  }
}
