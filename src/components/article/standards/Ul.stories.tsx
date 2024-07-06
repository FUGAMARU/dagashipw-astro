import Li from "@/components/article/standards/Li"
import Ul from "@/components/article/standards/Ul"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Ul> = {
  component: Ul,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => {
    return (
      <Ul>
        <Li>Item1</Li>
        <Li>Item2</Li>
        <Li>Item3</Li>
      </Ul>
    )
  }
}
