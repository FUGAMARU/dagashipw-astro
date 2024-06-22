import type { Meta, StoryObj } from "@storybook/react"

import { Image } from "./Image"

const meta: Meta<typeof Image> = {
  title: "components/Image",
  component: Image,
  tags: ["autodocs"],
  args: { ref: undefined, key: undefined },
  argTypes: {
    ref: { control: "select", options: ["string", "(instance: T) => void", "React.RefObject<T>"] },
    key: { control: "select", options: ["string", "number", "bigint"] }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
