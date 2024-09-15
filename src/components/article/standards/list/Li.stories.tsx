import { Li } from "@/components/article/standards/list/Li"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Li> = {
  component: Li,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "ListContent"
  }
}
