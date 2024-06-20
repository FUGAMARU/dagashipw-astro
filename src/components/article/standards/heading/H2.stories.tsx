import H2 from "@/components/article/heading/H2"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof H2> = {
  component: H2,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "見出し(H2)テキストがここに入る"
  }
}
