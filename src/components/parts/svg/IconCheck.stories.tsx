import { IconCheck } from "@/components/parts/svg/IconCheck"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconCheck> = {
  component: IconCheck,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 128, height: 128 }}>
      <IconCheck />
    </div>
  )
}
