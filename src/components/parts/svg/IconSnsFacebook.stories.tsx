import IconSnsFacebook from "@/components/parts/svg/IconSnsFacebook"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconSnsFacebook> = {
  component: IconSnsFacebook,
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
