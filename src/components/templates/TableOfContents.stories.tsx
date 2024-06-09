import TableOfContents from "@/components/templates/TableOfContents"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
  tags: ["autodocs"],
  args: { contents: undefined },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

/** 初期表示 */
export const Primary: Story = {
  args: {
    contents: [
      {
        h2: {
          title: "見出し1",
          href: "#heading1",
          h3: [
            {
              title: "見出し1-1",
              href: "#heading1-1",
              h4: [
                {
                  title: "見出し1-1-1",
                  href: "#heading1-1-1"
                }
              ]
            }
          ]
        }
      },
      {
        h2: {
          title: "見出し1",
          href: "#heading1",
          h3: [
            {
              title: "見出し1-1",
              href: "#heading1-1",
              h4: [
                {
                  title: "見出し1-1-1",
                  href: "#heading1-1-1"
                }
              ]
            },
            {
              title: "見出し1-2",
              href: "#heading1-2"
            }
          ]
        }
      },
      {
        h2: {
          title: "見出し1",
          href: "#heading1",
          h3: [
            {
              title: "見出し1-1",
              href: "#heading1-1"
            }
          ]
        }
      },
      {
        h2: {
          title: "見出し1",
          href: "#heading1"
        }
      }
    ]
  }
}
