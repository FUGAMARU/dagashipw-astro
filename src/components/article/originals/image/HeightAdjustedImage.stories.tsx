import { HeightAdjustedImage } from "@/components/article/originals/image/HeightAdjustedImage"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof HeightAdjustedImage> = {
  component: HeightAdjustedImage,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    src: "/dummy-images/cat.jpg"
  }
}
