import { CodeBlock } from "@/components/article/originals/CodeBlock"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
  tags: ["autodocs"],
  args: { language: undefined, code: undefined },
  argTypes: { language: { control: "text" }, code: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    language: "typescript",
    code: `const arr = Array.from({length: 10}, (_, i) => i + 1);
const sum = arr.reduce((acc, elm) => acc + elm);
console.log(sum) // 55`
  }
}
