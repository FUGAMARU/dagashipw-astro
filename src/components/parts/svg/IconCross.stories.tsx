import { IconCross } from "@/components/parts/svg/IconCross"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconCross> = {
  component: IconCross,
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
