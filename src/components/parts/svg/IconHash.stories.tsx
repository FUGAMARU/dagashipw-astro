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
  args: {
    width: 128,
    height: 128
  },
  render: args => (
    <span style={{ stroke: "#343434" }}>
      <IconHash {...args} />
    </span>
  )
}
