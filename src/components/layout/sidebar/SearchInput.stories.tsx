import { SearchInput } from "@/components/layout/sidebar/SearchInput"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof SearchInput> = {
  component: SearchInput,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
