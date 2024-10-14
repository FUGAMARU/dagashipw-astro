import { DownloadButton } from "@/components/article/originals/DownloadButton"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof DownloadButton> = {
  component: DownloadButton,
  tags: ["autodocs"],
  args: { url: undefined },
  argTypes: { url: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    url: "https://www.pa-works.jp/"
  }
}
