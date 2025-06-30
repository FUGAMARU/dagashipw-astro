import { InlineArticleCard } from "@/components/article/originals/InlineArticleCard"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof InlineArticleCard> = {
  component: InlineArticleCard,
  tags: ["autodocs"],
  args: { articleUrlId: undefined },
  argTypes: { articleUrlId: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
