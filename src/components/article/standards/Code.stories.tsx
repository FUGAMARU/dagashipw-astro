import { Code } from "@/components/article/standards/Code"

import type { Meta, StoryObj } from "@storybook/react-vite"

const meta: Meta<typeof Code> = {
  component: Code,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "/var/www/html"
  }
}
