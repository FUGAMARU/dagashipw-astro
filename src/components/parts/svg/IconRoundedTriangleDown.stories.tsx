import { IconRoundedTriangleDown } from "@/components/parts/svg/IconRoundedTriangleDown"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconRoundedTriangleDown> = {
  component: IconRoundedTriangleDown,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 128, height: 128 }}>
      <IconRoundedTriangleDown />
    </div>
  )
}
