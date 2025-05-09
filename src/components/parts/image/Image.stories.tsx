import { Image } from "@/components/parts/image/Image"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Image> = {
  component: Image,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    src: "/sea-candle.jpg"
  }
}
