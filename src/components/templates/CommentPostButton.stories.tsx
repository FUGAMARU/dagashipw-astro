import { CommentPostButton } from "@/components/templates/CommentPostButton"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof CommentPostButton> = {
  component: CommentPostButton,
  tags: ["autodocs"],
  args: { type: "button", onClick: undefined, disabled: false },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}
