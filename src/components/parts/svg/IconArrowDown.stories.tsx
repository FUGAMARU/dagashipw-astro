import { IconArrowDown } from "@/components/parts/svg/IconArrowDown"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconArrowDown> = {
  component: IconArrowDown,
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
