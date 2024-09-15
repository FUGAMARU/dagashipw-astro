import { DividerHorizontal } from "@/components/parts/common/DividerHorizontal"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof DividerHorizontal> = {
  component: DividerHorizontal,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
