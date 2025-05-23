/* eslint-disable reactHooks/rules-of-hooks */
import { useState, type ComponentProps } from "react"

import { CommonViewContainer } from "@/components/parts/CommonViewContainer"

import type { Meta, StoryObj } from "@storybook/react"

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
    const [isCommentPostModalOpen, setIsCommentPostModalOpen] = useState(false)

    return (
      <div style={{ backgroundColor: "#f8f8f8", padding: "20px" }}>
        <CommonViewContainer
          isOpen={isCommentPostModalOpen}
          isReferredFromCommentView
          onClose={() => setIsCommentPostModalOpen(false)}
          onOpen={() => setIsCommentPostModalOpen(true)}
          onSubmit={() => {
            console.log("コメントを投稿")
          }}
          sectionTitleProps={{
            icon: { name: "commentWithPen", coloringMethod: "fill" },
            title: `この記事に寄せられたコメント (100)`
          }}
        >
          <div>子要素</div>
        </CommonViewContainer>
      </div>
    )
  }
}
