import { IconClock } from "@/components/parts/svg/IconClock"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconClock> = {
  component: IconClock,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 128, height: 128 }}>
      <IconClock />
    </div>
  )
}
