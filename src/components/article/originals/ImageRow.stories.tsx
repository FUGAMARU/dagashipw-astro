import ImageRow from "@/components/article/originals/ImageRow"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ImageRow> = {
  component: ImageRow,
  tags: ["autodocs"],
  args: { leftSideImageUrl: undefined, rightSideImageUrl: undefined, gap: undefined },
  argTypes: {
    leftSideImageUrl: { control: "text" },
    rightSideImageUrl: { control: "text" },
    gap: { control: "text" }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    leftSideImageUrl: "/cat.jpg",
    rightSideImageUrl: "/sea-candle.jpg",
    gap: "16"
  }
}
