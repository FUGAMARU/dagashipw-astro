import IconSearch from "@/components/parts/icon/IconSearch"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconSearch> = {
  component: IconSearch,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

/** 初期表示 */
export const Primary: Story = {
  args: {
    width: 64,
    height: 64
  }
}
