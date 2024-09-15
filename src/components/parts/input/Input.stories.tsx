import { Input } from "@/components/parts/input/Input"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],
  args: { ref: undefined, key: undefined, hasSearchIcon: undefined },
  argTypes: {
    ref: { control: "select", options: ["string", "(instance: T) => void", "React.RefObject<T>"] },
    key: { control: "select", options: ["string", "number", "bigint"] },
    hasSearchIcon: { control: "boolean" }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { hasSearchIcon: false, placeholder: "Placeholder" }
}
