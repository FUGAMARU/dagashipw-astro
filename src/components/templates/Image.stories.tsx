import { Image } from "@/components/templates/Image"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Image> = {
  component: Image,
  tags: ["autodocs"],
  args: { ref: undefined, key: undefined, objectFitCover: undefined },
  argTypes: {
    ref: { control: "select", options: ["string", "(instance: T) => void", "React.RefObject<T>"] },
    key: { control: "select", options: ["string", "number", "bigint"] },
    objectFitCover: { control: "boolean" }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    src: "/sea-candle.jpg"
  }
}
