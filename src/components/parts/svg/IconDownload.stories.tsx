import { IconDownload } from "@/components/parts/svg/IconDownload"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconDownload> = {
  component: IconDownload,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 128, height: 128 }}>
      <IconDownload />
    </div>
  )
}
