import { IconInspiration } from "@/components/parts/svg/IconInspiration"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconInspiration> = {
  component: IconInspiration,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 128, height: 128 }}>
      <IconInspiration />
    </div>
  )
}
