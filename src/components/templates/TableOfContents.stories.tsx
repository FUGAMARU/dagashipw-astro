import { TableOfContents } from "@/components/templates/TableOfContents"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
  tags: ["autodocs"],
  args: { tableOfContentsData: undefined, minutesToRead: undefined },
  argTypes: { minutesToRead: { control: "number" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    minutesToRead: 5,
    tableOfContentsData: [
      {
        h2: {
          title: "Level2 Heading Text",
          href: "#h2"
        }
      },
      {
        h2: {
          title: "Level2 Heading Text",
          href: "#",
          h3: [
            {
              title: "Level3 Heading Text",
              href: "#",
              h4: [
                {
                  title: "Level4 Heading Text",
                  href: "#"
                }
              ]
            }
          ]
        }
      },
      {
        h2: {
          title: "Level2 Heading Text",
          href: "#"
        }
      }
    ]
  }
}
