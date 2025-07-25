/* eslint-disable reactHooks/rules-of-hooks */

import { CommentPostModal } from "@/components/templates/modal/CommentPostModal"
import { useCommentView } from "@/components/views/CommentView.hooks"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof CommentPostModal> = {
  component: CommentPostModal,
  tags: ["autodocs"],
  args: {
    userNameValue: undefined,
    bodyValue: undefined,
    userNameErrorMessage: undefined,
    bodyErrorMessage: undefined,
    onUserNameChange: undefined,
    onBodyChange: undefined,
    errorMessage: undefined,
    onSubmit: undefined,
    isPosting: undefined
  },
  argTypes: { errorMessage: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => {
    const {
      userNameValue,
      bodyValue,
      userNameErrorMessage,
      bodyErrorMessage,
      handleBodyChange,
      handleUserNameChange,
      isCommentPosting
    } = useCommentView("")

    return (
      <CommentPostModal
        bodyErrorMessage={bodyErrorMessage}
        bodyValue={bodyValue}
        isPosting={isCommentPosting}
        onBodyChange={handleBodyChange}
        onSubmit={() => console.log("submit")}
        onUserNameChange={handleUserNameChange}
        userNameErrorMessage={userNameErrorMessage}
        userNameValue={userNameValue}
      />
    )
  }
}
