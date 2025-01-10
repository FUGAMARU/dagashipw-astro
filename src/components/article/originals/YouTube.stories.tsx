import { YouTube } from "@/components/article/originals/YouTube"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof YouTube> = {
  component: YouTube,
  tags: ["autodocs"],
  args: { videoId: undefined, isCentered: undefined },
  argTypes: { videoId: { control: "text" }, isCentered: { control: "boolean" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    videoId: "eo8nPndrfFw"
  }
}

export const Centered: Story = {
  args: {
    videoId: "JodIjt0Oq-o",
    isCentered: true
  }
}
