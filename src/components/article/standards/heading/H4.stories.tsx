import { H4 } from "@/components/article/standards/heading/H4"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof H4> = {
  component: H4,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "見出し(H4)テキストがここに入る"
  }
}
