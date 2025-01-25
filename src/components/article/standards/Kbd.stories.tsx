import { Kbd } from "@/components/article/standards/Kbd"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Kbd> = {
  component: Kbd,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Alt</Kbd>
      <Kbd>⌘</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Space</Kbd>
      <Kbd>Esc</Kbd>
    </div>
  )
}
