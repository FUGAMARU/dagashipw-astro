import { HeightAdjustedImage } from "@/components/article/originals/media/HeightAdjustedImage"

import type { Meta, StoryObj } from "@storybook/react-vite"

const meta: Meta<typeof HeightAdjustedImage> = {
  component: HeightAdjustedImage,
  tags: ["autodocs"],
  args: { caption: undefined },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    src: "/dummy-images/cat.jpg"
  }
}
