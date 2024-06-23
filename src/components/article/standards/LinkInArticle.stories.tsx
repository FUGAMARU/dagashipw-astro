import type { Meta, StoryObj } from "@storybook/react"

import LinkInArticle from "./LinkInArticle"

const meta: Meta<typeof LinkInArticle> = {
  title: "components/LinkInArticle",
  component: LinkInArticle,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
