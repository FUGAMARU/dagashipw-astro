/* eslint-disable reactHooks/rules-of-hooks */
import { useEffect } from "react"

import { TableOfContents } from "@/components/templates/TableOfContents"
import { SESSION_STORAGE_TABLE_OF_CONTENTS_KEY } from "@/constants/value"

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
    useEffect(() => {
      sessionStorage.setItem(
        SESSION_STORAGE_TABLE_OF_CONTENTS_KEY,
        JSON.stringify([
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
        ])
      )
    }, [])

    return <TableOfContents />
  }
}
