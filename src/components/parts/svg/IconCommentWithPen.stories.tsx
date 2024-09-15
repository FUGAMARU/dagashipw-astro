import { IconCommentWithPen } from "@/components/parts/svg/IconCommentWithPen"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconCommentWithPen> = {
  component: IconCommentWithPen,
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
