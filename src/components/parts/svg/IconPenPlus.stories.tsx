import { IconPenPlus } from "@/components/parts/svg/IconPenPlus"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconPenPlus> = {
  component: IconPenPlus,
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
