import { IconHash } from "@/components/parts/svg/IconHash"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconHash> = {
  component: IconHash,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 128, height: 128, stroke: "#343434" }}>
      <IconHash />
    </div>
  )
}
