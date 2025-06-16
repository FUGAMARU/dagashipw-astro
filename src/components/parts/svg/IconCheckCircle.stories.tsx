import { IconCheckCircle } from "@/components/parts/svg/IconCheckCircle"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconCheckCircle> = {
  component: IconCheckCircle,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 128, height: 128 }}>
      <IconCheckCircle />
    </div>
  )
}
