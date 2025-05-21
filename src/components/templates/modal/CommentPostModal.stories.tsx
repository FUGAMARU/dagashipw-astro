/* eslint-disable reactHooks/rules-of-hooks */
import { useState, type ChangeEvent } from "react"

import { CommentPostModal } from "@/components/templates/modal/CommentPostModal"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof CommentPostModal> = {
  component: CommentPostModal,
  tags: ["autodocs"],
  args: { onSubmit: undefined },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => {
    const [userNameValue, setUserNameValue] = useState("")
    const [bodyValue, setBodyValue] = useState("")

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setUserNameValue(e.target.value)
    }

    const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setBodyValue(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log("submit")
    }

    return (
      <CommentPostModal
        bodyValue={bodyValue}
        onBodyChange={handleBodyChange}
        onSubmit={handleSubmit}
        onUserNameChange={handleUserNameChange}
        userNameValue={userNameValue}
      />
    )
  }
}
