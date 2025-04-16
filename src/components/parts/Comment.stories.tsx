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
      commentId: "1",
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
      commentId: "2",
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
      commentId: "3",
      commentNumber: "3",
      userName: "ユーザー名",
      submittedAt: "2023-10-01 12:00",
      body: "本文"
    }
  }
}
