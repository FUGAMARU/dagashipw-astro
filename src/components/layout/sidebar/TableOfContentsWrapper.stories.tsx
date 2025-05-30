import { TableOfContentsWrapper } from "@/components/layout/sidebar/TableOfContentsWrapper"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof TableOfContentsWrapper> = {
  component: TableOfContentsWrapper,
  tags: ["autodocs"],
  args: { article: undefined },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

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
          title: "見出し2",
          href: "#heading2",
          h3: [
            {
              title: "見出し2-1",
              href: "#heading2-1",
              h4: [
                {
                  title: "見出し2-1-1",
                  href: "#heading2-1-1"
                }
              ]
            },
            {
              title: "見出し2-2",
              href: "#heading2-2"
            }
          ]
        }
      },
      {
        h2: {
          title: "見出し3",
          href: "#heading3",
          h3: [
            {
              title: "見出し3-1",
              href: "#heading3-1"
            }
          ]
        }
      },
      {
        h2: {
          title: "見出し4",
          href: "#heading4"
        }
      }
    ],
    activeItemHref: "#heading2"
  }
}
