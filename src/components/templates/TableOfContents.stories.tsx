/* eslint-disable reactHooks/rules-of-hooks */

import { TableOfContents } from "@/components/templates/TableOfContents"
import { minutesToReadAtom } from "@/stores/minutes-to-read"
import { tableOfContentsAtom } from "@/stores/table-of-contents"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => {
    minutesToReadAtom.set(5)
    tableOfContentsAtom.set([
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
    ])

    return <TableOfContents />
  }
}
