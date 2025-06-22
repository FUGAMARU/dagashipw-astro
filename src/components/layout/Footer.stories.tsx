import { Footer } from "@/components/layout/Footer"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Footer> = {
  component: Footer,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
