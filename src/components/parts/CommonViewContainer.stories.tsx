import { CommonViewContainer } from "@/components/parts/CommonViewContainer"

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
    name: "checkCircle",
    coloringMethod: "fill"
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

export const HasRightTopElement: Story = {
  args: {
    ...commonProps,
    rightTopElement: <div>右上要素に表示する要素 (あれば)</div>
  },
  render: args => (
    <div style={{ backgroundColor: "#f8f8f8", padding: "20px" }}>
      <CommonViewContainer {...args} />
    </div>
  )
}
