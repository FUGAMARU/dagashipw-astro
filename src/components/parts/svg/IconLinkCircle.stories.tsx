import { IconLinkCircle } from "@/components/parts/svg/IconLinkCircle"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconLinkCircle> = {
  component: IconLinkCircle,
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
