import { AnimatedSkeleton } from "@/components/parts/common/AnimatedSkeleton"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof AnimatedSkeleton> = {
  component: AnimatedSkeleton,
  tags: ["autodocs"],
  args: { width: undefined, height: undefined },
  argTypes: { width: { control: "number" }, height: { control: "number" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div
      style={{
        width: "fit-content",
        padding: 28,
        borderRadius: 8,
        border: "solid 1px #e0e0e0",
        display: "flex",
        gap: 32,
        backgroundColor: "#fff",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
      }}
    >
      <div style={{ width: 50, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ height: 50, borderRadius: "50%", overflow: "hidden" }}>
          <AnimatedSkeleton />
        </div>
        <div style={{ height: 10 }}>
          <AnimatedSkeleton />
        </div>
      </div>

      <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ height: 20 }}>
          <AnimatedSkeleton />
        </div>
        <div style={{ height: 100 }}>
          <AnimatedSkeleton />
        </div>
      </div>
    </div>
  )
}
