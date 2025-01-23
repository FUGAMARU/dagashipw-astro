import { LogoWrapper } from "@/components/layout/LogoWrapper"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof LogoWrapper> = {
  component: LogoWrapper,
  tags: ["autodocs"],
  args: { isPC: undefined },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const SP: Story = {
  args: {
    isPC: false
  }
}

export const PC: Story = {
  args: {
    isPC: true
  }
}
