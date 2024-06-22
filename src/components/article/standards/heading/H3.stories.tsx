import H3 from "@/components/article/standards/heading/H3"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof H3> = {
  component: H3,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "見出し(H3)テキストがここに入る"
  }
}
