import { CodeBlock } from "@/components/article/originals/CodeBlock"
import {
  COPY_ICON_FADE_ANIMATION_DURATION,
  CHECK_ICON_DISPLAY_DURATION,
  getLanguageInfo
} from "@/components/article/originals/CodeBlockWrapper.helpers"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
  tags: ["autodocs"],
  args: { languageInfo: undefined, animationInfo: undefined, code: undefined },
  argTypes: { code: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

const commonAnimationProps = {
  copyIconFadeAnimationDuration: COPY_ICON_FADE_ANIMATION_DURATION,
  checkIconDisplayDuration: CHECK_ICON_DISPLAY_DURATION
}

export const Primary: Story = {
  args: {
    languageInfo: {
      keyword: "typescript",
      ...getLanguageInfo("typescript")
    },
    animationInfo: commonAnimationProps,
    code: `const arr = Array.from({length: 10}, (_, i) => i + 1);
const sum = arr.reduce((acc, elm) => acc + elm);
console.log(sum) // 55`
  }
}

export const Python: Story = {
  args: {
    languageInfo: {
      keyword: "python",
      ...getLanguageInfo("python")
    },
    animationInfo: commonAnimationProps,
    code: `def greet(name):
    print(f"Hello, {name}!")

greet("World")  # Hello, World!`
  }
}

export const Java: Story = {
  args: {
    languageInfo: {
      keyword: "java",
      ...getLanguageInfo("java")
    },
    animationInfo: commonAnimationProps,
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
  }
}

export const Cpp: Story = {
  args: {
    languageInfo: {
      keyword: "cpp",
      ...getLanguageInfo("cpp")
    },
    animationInfo: commonAnimationProps,
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
    languageInfo: {
      keyword: "ruby",
      ...getLanguageInfo("ruby")
    },
    animationInfo: commonAnimationProps,
    code: `def greet(name)
  puts "Hello, #{name}!"
end

greet("World") # Hello, World!`
  }
}

export const Kotlin: Story = {
  args: {
    languageInfo: {
      keyword: "kotlin",
      ...getLanguageInfo("kotlin")
    },
    animationInfo: commonAnimationProps,
    code: `fun greet(name: String) {
    println("Hello, $name!")
}

greet("World") // Hello, World!`
  }
}

export const Svelte: Story = {
  args: {
    languageInfo: {
      keyword: "svelte",
      ...getLanguageInfo("svelte")
    },
    animationInfo: commonAnimationProps,
    code: `<script>
  let name = "World";
</script>

<h1>Hello, {name}!</h1>`
  }
}

export const Go: Story = {
  args: {
    languageInfo: {
      keyword: "go",
      ...getLanguageInfo("go")
    },
    animationInfo: commonAnimationProps,
    code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`
  }
}
