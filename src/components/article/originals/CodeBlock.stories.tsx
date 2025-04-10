import { CodeBlock } from "@/components/article/originals/CodeBlock"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
  tags: ["autodocs"],
  args: { language: undefined, code: undefined },
  argTypes: { language: { control: "text" }, code: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    language: "typescript",
    code: `const arr = Array.from({length: 10}, (_, i) => i + 1);
const sum = arr.reduce((acc, elm) => acc + elm);
console.log(sum) // 55`
  }
}

export const Python: Story = {
  args: {
    language: "python",
    code: `def greet(name):
    print(f"Hello, {name}!")

greet("World")  # Hello, World!`
  }
}

export const Java: Story = {
  args: {
    language: "java",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
  }
}

export const Cpp: Story = {
  args: {
    language: "cpp",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`
  }
}

export const Ruby: Story = {
  args: {
    language: "ruby",
    code: `def greet(name)
  puts "Hello, #{name}!"
end

greet("World") # Hello, World!`
  }
}

export const Kotlin: Story = {
  args: {
    language: "kotlin",
    code: `fun greet(name: String) {
    println("Hello, $name!")
}

greet("World") // Hello, World!`
  }
}

export const Svelte: Story = {
  args: {
    language: "svelte",
    code: `<script>
  let name = "World";
</script>

<h1>Hello, {name}!</h1>`
  }
}

export const Go: Story = {
  args: {
    language: "go",
    code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`
  }
}
