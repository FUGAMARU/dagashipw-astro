import styled from "styled-components"

import { IconArrowDown } from "@/components/parts/svg/IconArrowDown"

import type { Meta, StoryObj } from "@storybook/react"

const StyledIconArrowDown = styled(IconArrowDown)`
  path {
    stroke: #343434;
  }
`

const meta: Meta<typeof IconArrowDown> = {
  component: StyledIconArrowDown,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    width: 128,
    height: 128
  }
}
