import { Pagination } from "@/components/templates/Pagination"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  tags: ["autodocs"],
  args: { useCase: undefined, currentPage: undefined, totalPageCount: undefined },
  argTypes: { currentPage: { control: "number" }, totalPageCount: { control: "number" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { currentPage: 1, totalPageCount: 10 }
}

export const FirstPage: Story = {
  args: { currentPage: 1, totalPageCount: 5 }
}

export const MiddlePage: Story = {
  args: { currentPage: 3, totalPageCount: 5 }
}

export const LastPage: Story = {
  args: { currentPage: 5, totalPageCount: 5 }
}
