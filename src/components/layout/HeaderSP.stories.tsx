import HeaderSP from "@/components/layout/HeaderSP"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof HeaderSP> = {
  component: HeaderSP,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

/** 初期表示 */
export const Primary: Story = {}
