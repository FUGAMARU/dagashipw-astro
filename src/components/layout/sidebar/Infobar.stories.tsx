import Infobar from "@/components/layout/sidebar/Infobar"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Infobar> = {
  component: Infobar,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

/** 初期表示 */
export const Primary: Story = {}
