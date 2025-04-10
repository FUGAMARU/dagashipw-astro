import { IconCopy } from "@/components/parts/svg/IconCopy"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconCopy> = {
  component: IconCopy,
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
