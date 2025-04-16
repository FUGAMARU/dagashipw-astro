import { Comment } from "@/components/parts/Comment"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Comment> = {
  component: Comment,
  tags: ["autodocs"],
  args: { displayType: undefined, commentInfo: undefined },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Comment>

export const ParentComment: Story = {
  args: {
    displayType: "parent",
    commentInfo: {
      commentNumber: "1",
      userName: "ユーザー名",
      submittedAt: "2023-10-01 12:00",
      body: "本文"
    }
  }
}

export const ParentCommentWithReply: Story = {
  args: {
    displayType: "parent",
    hasReply: true,
    commentInfo: {
      commentNumber: "2",
      userName: "ユーザー名",
      submittedAt: "2023-10-01 12:00",
      body: "本文"
    }
  }
}

export const ChildComment: Story = {
  args: {
    displayType: "child",
    commentInfo: {
      commentNumber: "3",
      userName: "ユーザー名",
      submittedAt: "2023-10-01 12:00",
      body: "本文"
    }
  }
}
