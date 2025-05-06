import { Input } from "@/components/parts/input/Input"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],
  args: { ref: undefined, key: undefined, hasSearchIcon: undefined, errorMessage: undefined },
  argTypes: {
    ref: {
      control: "select",
      options: ["(instance: T) => void | (() => VoidOrUndefinedOnly)", "React.RefObject<T>"]
    },
    key: { control: "select", options: ["string", "number", "bigint"] },
    hasSearchIcon: { control: "boolean" },
    errorMessage: { control: "text" }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { hasSearchIcon: false, placeholder: "Placeholder" }
}

export const HasSearchIcon: Story = {
  args: { hasSearchIcon: true, placeholder: "Placeholder" }
}

export const HasErrorMessage: Story = {
  args: { hasSearchIcon: false, placeholder: "Placeholder", errorMessage: "エラーメッセージ" }
}
