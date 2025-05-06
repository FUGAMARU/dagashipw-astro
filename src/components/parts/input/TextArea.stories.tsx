import { TextArea } from "@/components/parts/input/TextArea"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  tags: ["autodocs"],
  args: { ref: undefined, key: undefined, errorMessage: undefined },
  argTypes: {
    ref: {
      control: "select",
      options: ["(instance: T) => void | (() => VoidOrUndefinedOnly)", "React.RefObject<T>"]
    },
    key: { control: "select", options: ["string", "number", "bigint"] },
    errorMessage: { control: "text" }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    placeholder: "Placeholder"
  }
}

export const HasErrorMessage: Story = {
  args: {
    placeholder: "Placeholder",
    errorMessage: "エラーメッセージ"
  }
}
