import IconSnsLine from "@/components/parts/svg/IconSnsLine"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconSnsLine> = {
  component: IconSnsLine,
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
