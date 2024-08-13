import Iframe from "@/components/article/standards/Iframe"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Iframe> = {
  component: Iframe,
  tags: ["autodocs"],
  args: { ref: undefined, key: undefined },
  argTypes: {
    ref: { control: "select", options: ["string", "(instance: T) => void", "React.RefObject<T>"] },
    key: { control: "select", options: ["string", "number", "bigint"] }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    src: "https://www.pa-works.jp/",
    style: { width: "100%", height: "500px" }
  }
}
