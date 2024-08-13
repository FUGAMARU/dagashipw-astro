import IconDoubleRightArrow from "@/components/parts/svg/IconDoubleRightArrow"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconDoubleRightArrow> = {
  component: IconDoubleRightArrow,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    width: 128,
    height: 128
  }
}
