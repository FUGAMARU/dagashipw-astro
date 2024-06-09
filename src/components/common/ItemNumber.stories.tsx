import ItemNumber from "@/components/common/ItemNumber"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ItemNumber> = {
  component: ItemNumber,
  tags: ["autodocs"],
  args: { itemNumber: undefined, isOutlined: undefined },
  argTypes: {
    itemNumber: { control: "text" },
    isOutlined: { control: "boolean" }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/** 初期表示 */
export const Primary: Story = {
  args: { itemNumber: "1" }
}
