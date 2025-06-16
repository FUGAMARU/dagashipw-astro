import { IconPenPlus } from "@/components/parts/svg/IconPenPlus"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconPenPlus> = {
  component: IconPenPlus,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 128, height: 128 }}>
      <IconPenPlus />
    </div>
  )
}
