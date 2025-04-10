import { IconCheckCircle } from "@/components/parts/svg/IconCheckCircle"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconCheckCircle> = {
  component: IconCheckCircle,
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
