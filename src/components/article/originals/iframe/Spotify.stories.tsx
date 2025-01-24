import { Spotify } from "@/components/article/originals/iframe/Spotify"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Spotify> = {
  component: Spotify,
  tags: ["autodocs"],
  args: { trackId: undefined },
  argTypes: { trackId: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    trackId: "79wzjRTeNWKq0VHLZcBHEf"
  }
}
