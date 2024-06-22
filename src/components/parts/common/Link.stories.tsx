import type { Meta, StoryObj } from "@storybook/react"

import Link from "./Link"

const meta: Meta<typeof Link> = {
  title: "components/Link",
  component: Link,
  tags: ["autodocs"],
  args: { href: undefined, children: "string" },
  argTypes: {
    href: { control: "text" },
    children: {
      control: "select",
      options: [
        "string",
        "number",
        "false",
        "true",
        "React.ReactElement<any, string | React.JSXElementConstructor<any>>",
        "Iterable<React.ReactNode>",
        "React.ReactPortal"
      ]
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
