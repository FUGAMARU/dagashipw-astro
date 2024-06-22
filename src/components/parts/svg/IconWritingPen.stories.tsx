import IconWritingPen from "@/components/parts/svg/IconWritingPen"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconWritingPen> = {
  component: IconWritingPen,
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
