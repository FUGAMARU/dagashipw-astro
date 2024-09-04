import { Table } from "@/components/article/standards/Table"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Table> = {
  component: Table,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: (
      <>
        <thead>
          <tr>
            <th />
            <th>列1</th>
            <th>列2</th>
            <th>列3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>行1</td>
            <td>Value</td>
            <td>Value</td>
            <td>Value</td>
          </tr>
          <tr>
            <td>行2</td>
            <td>Value</td>
            <td>Value</td>
            <td>Value</td>
          </tr>
          <tr>
            <td>行3</td>
            <td>Value</td>
            <td>Value</td>
            <td>Value</td>
          </tr>
        </tbody>
      </>
    )
  }
}
