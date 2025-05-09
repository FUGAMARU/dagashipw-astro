import { ImageOnlyClient } from "@/components/parts/image/ImageOnlyClient"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ImageOnlyClient> = {
  component: ImageOnlyClient,
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
