import { IconLabelPlus } from "@/components/parts/svg/IconLabelPlus"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconLabelPlus> = {
  component: IconLabelPlus,
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
