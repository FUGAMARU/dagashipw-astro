import { ItemNumber } from "@/components/parts/common/ItemNumber"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ItemNumber> = {
  component: ItemNumber,
  tags: ["autodocs"],
  args: { itemNumber: undefined, isFilled: undefined },
  argTypes: { itemNumber: { control: "text" }, isFilled: { control: "boolean" } }
}

export default meta
type Story = StoryObj<typeof meta>

/** Outlined */
export const Outlined: Story = {
  args: { itemNumber: "1" }
}

/** Filled */
export const Filled: Story = {
  args: { itemNumber: "1", isFilled: true }
}

/** 2桁 */
export const DoubleDigit: Story = {
  args: { itemNumber: "99" }
}

/** 3桁以上 */
export const MultiDigit: Story = {
  args: { itemNumber: "100" }
}

/** ハイフンあり */
export const WithHyphen: Story = {
  args: { itemNumber: "1-1" }
}
