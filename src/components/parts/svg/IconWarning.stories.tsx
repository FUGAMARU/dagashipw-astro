import { IconWarning } from "@/components/parts/svg/IconWarning"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconWarning> = {
  component: IconWarning,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    width: 64,
    height: 64
  }
}
