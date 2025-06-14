import { ResponsiveContainer } from "@/components/parts/common/ResponsiveContainer"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ResponsiveContainer> = {
  component: ResponsiveContainer,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const OnlySP: Story = {
  args: {
    isPC: false,
    children: <div>SPでのみ表示されるコンテンツ</div>
  }
}

export const OnlyPC: Story = {
  args: {
    isPC: true,
    children: <div>PCでのみ表示されるコンテンツ</div>
  }
}
