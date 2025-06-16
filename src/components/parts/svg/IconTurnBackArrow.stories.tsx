import { IconTurnBackArrow } from "@/components/parts/svg/IconTurnBackArrow"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconTurnBackArrow> = {
  component: IconTurnBackArrow,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 128, height: 128 }}>
      <IconTurnBackArrow />
    </div>
  )
}
