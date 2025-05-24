/* eslint-disable reactHooks/rules-of-hooks */

import { CommonViewContainer } from "@/components/parts/CommonViewContainer"
import { Modal } from "@/components/parts/Modal"
import { CommentPostButton } from "@/components/templates/CommentPostButton"
import { CommentPostModal } from "@/components/templates/modal/CommentPostModal"
import { useCommentView } from "@/components/views/CommentView.hooks"

import type { Meta, StoryObj } from "@storybook/react"
import type { ComponentProps } from "react"

const meta: Meta<typeof CommonViewContainer> = {
  component: CommonViewContainer,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof CommonViewContainer>

const commonProps = {
  icon: {
    name: "hash",
    coloringMethod: "stroke"
  },
  title: "セクションタイトル",
  children: <div>子要素</div>
} as const satisfies ComponentProps<typeof CommonViewContainer>

export const Primary: Story = {
  args: {
    ...commonProps
  },
  render: args => (
    <div style={{ backgroundColor: "#f8f8f8", padding: "20px" }}>
      <CommonViewContainer {...args} />
    </div>
  )
}

export const FromCommentView: Story = {
  render: () => {
    const {
      userNameValue,
      bodyValue,
      userNameErrorMessage,
      bodyErrorMessage,
      handleBodyChange,
      handleCommentPostModalClose,
      handleCommentPostModalOpen,
      handleUserNameChange,
      isCommentPostModalOpen
    } = useCommentView("")

    return (
      <div style={{ backgroundColor: "#f8f8f8", padding: "20px" }}>
        <CommonViewContainer
          commentPostButton={
            <Modal
              icon={{
                name: "commentWithPen",
                coloringMethod: "fill"
              }}
              isOpen={isCommentPostModalOpen}
              onClose={handleCommentPostModalClose}
              title="コメントをどうぞ"
              triggerElement={
                <CommentPostButton onClick={handleCommentPostModalOpen} type="button" />
              }
            >
              <CommentPostModal
                bodyErrorMessage={bodyErrorMessage}
                bodyValue={bodyValue}
                onBodyChange={handleBodyChange}
                onSubmit={() => console.log("submit")}
                onUserNameChange={handleUserNameChange}
                userNameErrorMessage={userNameErrorMessage}
                userNameValue={userNameValue}
              />
            </Modal>
          }
          icon={{
            name: "commentWithPen",
            coloringMethod: "fill"
          }}
          title="この記事に寄せられたコメント (100)"
        >
          <div>子要素</div>
        </CommonViewContainer>
      </div>
    )
  }
}
