import IconSearch from "@/components/parts/svg/IconSearch"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconSearch> = {
  component: IconSearch,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    width: 64,
    height: 64
  }
}
