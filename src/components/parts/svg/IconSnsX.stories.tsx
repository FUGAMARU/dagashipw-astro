import { IconSnsX } from "@/components/parts/svg/IconSnsX"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconSnsX> = {
  component: IconSnsX,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 128, height: 128 }}>
      <IconSnsX />
    </div>
  )
}
