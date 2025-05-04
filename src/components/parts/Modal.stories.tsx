/* eslint-disable reactHooks/rules-of-hooks */
import { useState } from "react"

import { Modal } from "@/components/parts/Modal"
import { CommentPostButton } from "@/components/templates/CommentPostButton"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
      <Modal
        icon={{
          name: "commentWithPen",
          coloringMethod: "fill"
        }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submitButton={<CommentPostButton />}
        title="コメントをどうぞ"
        triggerElement={
          <button
            onClick={() => {
              setIsModalOpen(true)
            }}
            style={{
              backgroundColor: "#007aff",
              color: "#fff",
              padding: "8px 16px",
              fontSize: "14px",
              borderRadius: "100px",
              boxShadow: "0 2px 10px rgba(0, 122, 255, 0.3)"
            }}
          >
            モーダルを開く
          </button>
        }
      >
        モーダルで表示するコンテンツ
      </Modal>
    )
  }
}
