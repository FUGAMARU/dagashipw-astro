import { HeightAdjustedVideo } from "@/components/article/originals/media/HeightAdjustedVideo"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof HeightAdjustedVideo> = {
  component: HeightAdjustedVideo,
  tags: ["autodocs"],
  argTypes: {},
  args: { src: undefined }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    src: "https://directus.dagashi.pw/assets/4c8dcb35-6317-4450-8329-34ee448143eb"
  }
}
