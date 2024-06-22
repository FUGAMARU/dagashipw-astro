import IconReverseClock from "@/components/parts/svg/IconReverseClock"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconReverseClock> = {
  component: IconReverseClock,
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
