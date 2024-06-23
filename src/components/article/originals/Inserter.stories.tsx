import type { Meta, StoryObj } from "@storybook/react"

import { Inserter } from "./Inserter"

const meta: Meta<typeof Inserter> = {
  title: "components/Inserter",
  component: Inserter,
  tags: ["autodocs"],
  args: { type: "tableOfContents" },
  argTypes: { type: { control: "select", options: ["tableOfContents", "ad"] } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
