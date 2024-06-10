import Icon from "@/components/parts/icon/Icon"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Icon> = {
  component: Icon,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

/** 初期表示 */
export const Primary: Story = {
  args: {
    name: "search",
    width: 64,
    height: 64
  }
}
