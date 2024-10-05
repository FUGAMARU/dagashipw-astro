import { ImageRow } from "@/components/article/originals/image/ImageRow"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ImageRow> = {
  component: ImageRow,
  tags: ["autodocs"],
  args: { images: undefined, gap: undefined },
  argTypes: { images: { control: "text" }, gap: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

/** 2枚表示 */
export const TwoImages: Story = {
  args: {
    images: "/cat.jpg, /sea-candle.jpg",
    gap: "16"
  }
}

/** 3枚表示 */
export const ThreeImages: Story = {
  args: {
    images: "/cat.jpg, /sea-candle.jpg, /nagara-park.jpg",
    gap: "16"
  }
}
