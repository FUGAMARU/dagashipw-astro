import type { Meta, StoryObj } from "@storybook/react"

import { CommentPostModal } from "./CommentPostModal"

const meta: Meta<typeof CommentPostModal> = {
  title: "components/CommentPostModal",
  component: CommentPostModal,
  tags: ["autodocs"],
  args: { onSubmit: undefined },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
