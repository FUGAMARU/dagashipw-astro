import SidebarItemWithTitle from "@/components/layout/sidebar/SidebarItemWithTitle"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof SidebarItemWithTitle> = {
  component: SidebarItemWithTitle,
  tags: ["autodocs"],
  args: { title: undefined, children: "string" },
  argTypes: {
    title: { control: "text" },
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

export const Primary: Story = {
  args: {
    title: "Title",
    children: (
      <div style={{ width: "100%", backgroundColor: "#ffe08c", padding: "8px" }}>Contents</div>
    )
  }
}
