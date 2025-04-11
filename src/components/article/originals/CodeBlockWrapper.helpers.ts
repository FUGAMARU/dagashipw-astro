import { isDefined } from "@/utils"
import { determineWhiteTextColor } from "@/utils/color"

/** コピーアイコンのフェードアニメーションのDuration (ms) */
export const COPY_ICON_FADE_ANIMATION_DURATION = 300

/** コピーアイコン押下後チェックマークを表示している時間 (ms) */
export const CHECK_ICON_DISPLAY_DURATION = 3000

/** 言語情報 */
export type CodeBlockLanguageInfo = {
  /** ラベル */
  label: string
  /** キーワード */
  keyword: Array<string>
  /** テーマカラー */
  themeColor: string
}

/**
 * language Propsで渡される文字列に紐づく言語情報の定数
 *
 * @see https://shiki.style/languages
 */
const LANGUAGE_INFO_DEFINITIONS = [
  {
    label: "ABAP",
    keyword: ["abap"],
    themeColor: "#e87400"
  },
  {
    label: "ActionScript",
    keyword: ["actionscript-3"],
    themeColor: "#882b0f"
  },
  {
    label: "Ada",
    keyword: ["ada"],
    themeColor: "#02f88c"
  },
  {
    label: "Angular HTML",
    keyword: ["angular-html"],
    themeColor: "#dd0031"
  },
  {
    label: "Angular TypeScript",
    keyword: ["angular-ts"],
    themeColor: "#dd0031"
  },
  {
    label: "Apache Conf",
    keyword: ["apache"],
    themeColor: "#d22128"
  },
  {
    label: "Apex",
    keyword: ["apex"],
    themeColor: "#1797c0"
  },
  {
    label: "APL",
    keyword: ["apl"],
    themeColor: "#5a816e"
  },
  {
    label: "AppleScript",
    keyword: ["applescript"],
    themeColor: "#101f1f"
  },
  {
    label: "Ara",
    keyword: ["ara"],
    themeColor: "#86a8c0"
  },
  {
    label: "AsciiDoc",
    keyword: ["asciidoc", "adoc"],
    themeColor: "#73a0c5"
  },
  {
    label: "Assembly",
    keyword: ["asm"],
    themeColor: "#6e4c13"
  },
  {
    label: "Astro",
    keyword: ["astro"],
    themeColor: "#ff5d01"
  },
  {
    label: "AWK",
    keyword: ["awk"],
    themeColor: "#c30e9b"
  },
  {
    label: "Ballerina",
    keyword: ["ballerina"],
    themeColor: "#ff5000"
  },
  {
    label: "Batch File",
    keyword: ["bat", "batch"],
    themeColor: "#c1f12e"
  },
  {
    label: "Beancount",
    keyword: ["beancount"],
    themeColor: "#64b946"
  },
  {
    label: "Berry",
    keyword: ["berry", "be"],
    themeColor: "#1a2c4e"
  },
  {
    label: "BibTeX",
    keyword: ["bibtex"],
    themeColor: "#778899"
  },
  {
    label: "Bicep",
    keyword: ["bicep"],
    themeColor: "#519aba"
  },
  {
    label: "Blade",
    keyword: ["blade"],
    themeColor: "#f7523f"
  },
  {
    label: "1C (Enterprise)",
    keyword: ["bsl", "1c"],
    themeColor: "#814ccc"
  },
  {
    label: "C",
    keyword: ["c"],
    themeColor: "#555555"
  },
  {
    label: "Cadence",
    keyword: ["cadence", "cdc"],
    themeColor: "#00ef8b"
  },
  {
    label: "Cairo",
    keyword: ["cairo"],
    themeColor: "#ff4545"
  },
  {
    label: "Clarity",
    keyword: ["clarity"],
    themeColor: "#211f6d"
  },
  {
    label: "Clojure",
    keyword: ["clojure", "clj"],
    themeColor: "#db5855"
  },
  {
    label: "CMake",
    keyword: ["cmake"],
    themeColor: "#da3434"
  },
  {
    label: "COBOL",
    keyword: ["cobol"],
    themeColor: "#585858"
  },
  {
    label: "CODEOWNERS",
    keyword: ["codeowners"],
    themeColor: "#3c4c5a"
  },
  {
    label: "CodeQL",
    keyword: ["codeql", "ql"],
    themeColor: "#111f2c"
  },
  {
    label: "CoffeeScript",
    keyword: ["coffee", "coffeescript"],
    themeColor: "#244776"
  },
  {
    label: "Common Lisp",
    keyword: ["common-lisp", "lisp"],
    themeColor: "#3fb68b"
  },
  {
    label: "Coq",
    keyword: ["coq"],
    themeColor: "#d0b68c"
  },
  {
    label: "C++",
    keyword: ["cpp", "c++"],
    themeColor: "#f34b7d"
  },
  {
    label: "Crystal",
    keyword: ["crystal"],
    themeColor: "#000100"
  },
  {
    label: "C#",
    keyword: ["csharp", "c#", "cs"],
    themeColor: "#178600"
  },
  {
    label: "CSS",
    keyword: ["css"],
    themeColor: "#563d7c"
  },
  {
    label: "CSV",
    keyword: ["csv"],
    themeColor: "#d0d0d0"
  },
  {
    label: "CUE",
    keyword: ["cue"],
    themeColor: "#5886e1"
  },
  {
    label: "Cypher",
    keyword: ["cypher", "cql"],
    themeColor: "#0b6f7e"
  },
  {
    label: "D",
    keyword: ["d"],
    themeColor: "#ba595e"
  },
  {
    label: "Dart",
    keyword: ["dart"],
    themeColor: "#00b4ab"
  },
  {
    label: "DAX",
    keyword: ["dax"],
    themeColor: "#f2c811"
  },
  {
    label: "Desktop",
    keyword: ["desktop"],
    themeColor: "#3c8dad"
  },
  {
    label: "Diff",
    keyword: ["diff"],
    themeColor: "#eaeaea"
  },
  {
    label: "Dockerfile",
    keyword: ["docker", "dockerfile"],
    themeColor: "#384d54"
  },
  {
    label: "dotEnv",
    keyword: ["dotenv"],
    themeColor: "#ecd53f"
  },
  {
    label: "Dream Maker",
    keyword: ["dream-maker"],
    themeColor: "#7e99c7"
  },
  {
    label: "Edge",
    keyword: ["edge"],
    themeColor: "#888888"
  },
  {
    label: "Elixir",
    keyword: ["elixir"],
    themeColor: "#6e4a7e"
  },
  {
    label: "Elm",
    keyword: ["elm"],
    themeColor: "#60b5cc"
  },
  {
    label: "Emacs Lisp",
    keyword: ["emacs-lisp", "elisp"],
    themeColor: "#c065db"
  },
  {
    label: "ERB",
    keyword: ["erb"],
    themeColor: "#701516"
  },
  {
    label: "Erlang",
    keyword: ["erlang", "erl"],
    themeColor: "#b83998"
  },
  {
    label: "Fennel",
    keyword: ["fennel"],
    themeColor: "#fff3d7"
  },
  {
    label: "Fish",
    keyword: ["fish"],
    themeColor: "#4682b4"
  },
  {
    label: "Fluent",
    keyword: ["fluent", "ftl"],
    themeColor: "#ffc65d"
  },
  {
    label: "Fortran (Fixed Form)",
    keyword: ["fortran-fixed-form", "f", "for", "f77"],
    themeColor: "#4d41b1"
  },
  {
    label: "Fortran (Free Form)",
    keyword: ["fortran-free-form", "f90", "f95", "f03", "f08", "f18"],
    themeColor: "#4d41b1"
  },
  {
    label: "F#",
    keyword: ["fsharp", "f#", "fs"],
    themeColor: "#b845fc"
  },
  {
    label: "GDResource",
    keyword: ["gdresource"],
    themeColor: "#478cbf"
  },
  {
    label: "GDScript",
    keyword: ["gdscript"],
    themeColor: "#355570"
  },
  {
    label: "GDShader",
    keyword: ["gdshader"],
    themeColor: "#478cbf"
  },
  {
    label: "Genie",
    keyword: ["genie"],
    themeColor: "#fbacbd"
  },
  {
    label: "Gherkin",
    keyword: ["gherkin"],
    themeColor: "#5b2063"
  },
  {
    label: "Git Commit Message",
    keyword: ["git-commit"],
    themeColor: "#f5f5f5"
  },
  {
    label: "Git Rebase Message",
    keyword: ["git-rebase"],
    themeColor: "#f5f5f5"
  },
  {
    label: "Gleam",
    keyword: ["gleam"],
    themeColor: "#ffaff3"
  },
  {
    label: "Glimmer JS",
    keyword: ["glimmer-js", "gjs"],
    themeColor: "#e04e39"
  },
  {
    label: "Glimmer TS",
    keyword: ["glimmer-ts", "gts"],
    themeColor: "#e04e39"
  },
  {
    label: "GLSL",
    keyword: ["glsl"],
    themeColor: "#5686a5"
  },
  {
    label: "Gnuplot",
    keyword: ["gnuplot"],
    themeColor: "#f0a9f0"
  },
  {
    label: "Go",
    keyword: ["go"],
    themeColor: "#00add8"
  },
  {
    label: "GraphQL",
    keyword: ["graphql", "gql"],
    themeColor: "#e10098"
  },
  {
    label: "Groovy",
    keyword: ["groovy"],
    themeColor: "#4298b8"
  },
  {
    label: "Hack",
    keyword: ["hack"],
    themeColor: "#878787"
  },
  {
    label: "Ruby Haml",
    keyword: ["haml"],
    themeColor: "#ece2a9"
  },
  {
    label: "Handlebars",
    keyword: ["handlebars", "hbs"],
    themeColor: "#f7931e"
  },
  {
    label: "Haskell",
    keyword: ["haskell", "hs"],
    themeColor: "#5e5086"
  },
  {
    label: "Haxe",
    keyword: ["haxe"],
    themeColor: "#df7900"
  },
  {
    label: "HashiCorp HCL",
    keyword: ["hcl"],
    themeColor: "#844fba"
  },
  {
    label: "Hjson",
    keyword: ["hjson"],
    themeColor: "#292929"
  },
  {
    label: "HLSL",
    keyword: ["hlsl"],
    themeColor: "#a2cd3a"
  },
  {
    label: "HTML",
    keyword: ["html"],
    themeColor: "#e34c26"
  },
  {
    label: "HTML (Derivative)",
    keyword: ["html-derivative"],
    themeColor: "#e34c26"
  },
  {
    label: "HTTP",
    keyword: ["http"],
    themeColor: "#005c9c"
  },
  {
    label: "HXML",
    keyword: ["hxml"],
    themeColor: "#df7900"
  },
  {
    label: "Hy",
    keyword: ["hy"],
    themeColor: "#7790b2"
  },
  {
    label: "Imba",
    keyword: ["imba"],
    themeColor: "#17b4db"
  },
  {
    label: "INI",
    keyword: ["ini", "properties"],
    themeColor: "#d0d0d0"
  },
  {
    label: "Java",
    keyword: ["java"],
    themeColor: "#b07219"
  },
  {
    label: "JavaScript",
    keyword: ["javascript", "js"],
    themeColor: "#f1e05a"
  },
  {
    label: "Jinja",
    keyword: ["jinja"],
    themeColor: "#a52a22"
  },
  {
    label: "Jison",
    keyword: ["jison"],
    themeColor: "#e8e82e"
  },
  {
    label: "JSON",
    keyword: ["json"],
    themeColor: "#292929"
  },
  {
    label: "JSON5",
    keyword: ["json5"],
    themeColor: "#292929"
  },
  {
    label: "JSON with Comments",
    keyword: ["jsonc"],
    themeColor: "#292929"
  },
  {
    label: "JSON Lines",
    keyword: ["jsonl"],
    themeColor: "#292929"
  },
  {
    label: "Jsonnet",
    keyword: ["jsonnet"],
    themeColor: "#006400"
  },
  {
    label: "JSSM",
    keyword: ["jssm", "fsl"],
    themeColor: "#ca854b"
  },
  {
    label: "JSX",
    keyword: ["jsx"],
    themeColor: "#61dafb"
  },
  {
    label: "Julia",
    keyword: ["julia", "jl"],
    themeColor: "#a270ba"
  },
  {
    label: "Kotlin",
    keyword: ["kotlin", "kt", "kts"],
    themeColor: "#a97bff"
  },
  {
    label: "Kusto",
    keyword: ["kusto", "kql"],
    themeColor: "#0078d4"
  },
  {
    label: "LaTeX",
    keyword: ["latex"],
    themeColor: "#3d6117"
  },
  {
    label: "Lean 4",
    keyword: ["lean", "lean4"],
    themeColor: "#7f308f"
  },
  {
    label: "Less",
    keyword: ["less"],
    themeColor: "#1d365d"
  },
  {
    label: "Liquid",
    keyword: ["liquid"],
    themeColor: "#67b8de"
  },
  {
    label: "LLVM IR",
    keyword: ["llvm"],
    themeColor: "#185619"
  },
  {
    label: "Log file",
    keyword: ["log"],
    themeColor: "#888888"
  },
  {
    label: "Logo",
    keyword: ["logo"],
    themeColor: "#d3101e"
  },
  {
    label: "Lua",
    keyword: ["lua"],
    themeColor: "#000080"
  },
  {
    label: "Luau",
    keyword: ["luau"],
    themeColor: "#00a2ff"
  },
  {
    label: "Makefile",
    keyword: ["make", "makefile"],
    themeColor: "#427819"
  },
  {
    label: "Markdown",
    keyword: ["markdown", "md"],
    themeColor: "#083fa1"
  },
  {
    label: "Marko",
    keyword: ["marko"],
    themeColor: "#42b817"
  },
  {
    label: "MATLAB",
    keyword: ["matlab"],
    themeColor: "#e16737"
  },
  {
    label: "MDC",
    keyword: ["mdc"],
    themeColor: "#4386e2"
  },
  {
    label: "MDX",
    keyword: ["mdx"],
    themeColor: "#fcb32c"
  },
  {
    label: "Mermaid",
    keyword: ["mermaid", "mmd"],
    themeColor: "#ff3670"
  },
  {
    label: "MIPS Assembly",
    keyword: ["mipsasm", "mips"],
    themeColor: "#6e4c13"
  },
  {
    label: "Mojo",
    keyword: ["mojo"],
    themeColor: "#ff4c00"
  },
  {
    label: "Move",
    keyword: ["move"],
    themeColor: "#4a5189"
  },
  {
    label: "Narrat Language",
    keyword: ["narrat", "nar"],
    themeColor: "#9966ff"
  },
  {
    label: "Nextflow",
    keyword: ["nextflow", "nf"],
    themeColor: "#33a8e1"
  },
  {
    label: "Nginx",
    keyword: ["nginx"],
    themeColor: "#009639"
  },
  {
    label: "Nim",
    keyword: ["nim"],
    themeColor: "#37775b"
  },
  {
    label: "Nix",
    keyword: ["nix"],
    themeColor: "#7e7eff"
  },
  {
    label: "nushell",
    keyword: ["nushell", "nu"],
    themeColor: "#4e9906"
  },
  {
    label: "Objective-C",
    keyword: ["objective-c", "objc"],
    themeColor: "#438eff"
  },
  {
    label: "Objective-C++",
    keyword: ["objective-cpp"],
    themeColor: "#6866fb"
  },
  {
    label: "OCaml",
    keyword: ["ocaml"],
    themeColor: "#3be133"
  },
  {
    label: "Pascal",
    keyword: ["pascal"],
    themeColor: "#e3f171"
  },
  {
    label: "Perl",
    keyword: ["perl"],
    themeColor: "#0298c3"
  },
  {
    label: "PHP",
    keyword: ["php"],
    themeColor: "#4f5d95"
  },
  {
    label: "PL/SQL",
    keyword: ["plsql"],
    themeColor: "#dad8d8"
  },
  {
    label: "Gettext PO",
    keyword: ["po", "pot", "potx"],
    themeColor: "#7e808c"
  },
  {
    label: "Polar",
    keyword: ["polar"],
    themeColor: "#1060e8"
  },
  {
    label: "PostCSS",
    keyword: ["postcss"],
    themeColor: "#dc3a0c"
  },
  {
    label: "PowerQuery",
    keyword: ["powerquery"],
    themeColor: "#01b8aa"
  },
  {
    label: "PowerShell",
    keyword: ["powershell", "ps", "ps1"],
    themeColor: "#012456"
  },
  {
    label: "Prisma",
    keyword: ["prisma"],
    themeColor: "#0c344b"
  },
  {
    label: "Prolog",
    keyword: ["prolog"],
    themeColor: "#74283c"
  },
  {
    label: "Protocol Buffer 3",
    keyword: ["proto", "protobuf"],
    themeColor: "#ededed"
  },
  {
    label: "Pug",
    keyword: ["pug", "jade"],
    themeColor: "#a86454"
  },
  {
    label: "Puppet",
    keyword: ["puppet"],
    themeColor: "#302b6d"
  },
  {
    label: "PureScript",
    keyword: ["purescript"],
    themeColor: "#1d222d"
  },
  {
    label: "Python",
    keyword: ["python", "py"],
    themeColor: "#3572a5"
  },
  {
    label: "QML",
    keyword: ["qml"],
    themeColor: "#44a51c"
  },
  {
    label: "QML Directory",
    keyword: ["qmldir"],
    themeColor: "#44a51c"
  },
  {
    label: "Qt Style Sheets",
    keyword: ["qss"],
    themeColor: "#41cd52"
  },
  {
    label: "R",
    keyword: ["r"],
    themeColor: "#198ce7"
  },
  {
    label: "Racket",
    keyword: ["racket"],
    themeColor: "#3c5caa"
  },
  {
    label: "Raku",
    keyword: ["raku", "perl6"],
    themeColor: "#0000fb"
  },
  {
    label: "ASP.NET Razor",
    keyword: ["razor"],
    themeColor: "#9d2d4e"
  },
  {
    label: "Windows Registry Script",
    keyword: ["reg"],
    themeColor: "#e8a81d"
  },
  {
    label: "RegExp",
    keyword: ["regexp", "regex"],
    themeColor: "#bc428a"
  },
  {
    label: "Rel",
    keyword: ["rel"],
    themeColor: "#ff5a5f"
  },
  {
    label: "RISC-V",
    keyword: ["riscv"],
    themeColor: "#27348b"
  },
  {
    label: "reStructuredText",
    keyword: ["rst"],
    themeColor: "#141414"
  },
  {
    label: "Ruby",
    keyword: ["ruby", "rb"],
    themeColor: "#701516"
  },
  {
    label: "Rust",
    keyword: ["rust", "rs"],
    themeColor: "#dea584"
  },
  {
    label: "SAS",
    keyword: ["sas"],
    themeColor: "#b34936"
  },
  {
    label: "Sass",
    keyword: ["sass"],
    themeColor: "#a53b70"
  },
  {
    label: "Scala",
    keyword: ["scala"],
    themeColor: "#c22d40"
  },
  {
    label: "Scheme",
    keyword: ["scheme"],
    themeColor: "#1e4a22"
  },
  {
    label: "SCSS",
    keyword: ["scss"],
    themeColor: "#c6538c"
  },
  {
    label: "1C (Query)",
    keyword: ["sdbl", "1c-query"],
    themeColor: "#814ccc"
  },
  {
    label: "ShaderLab",
    keyword: ["shaderlab", "shader"],
    themeColor: "#222c37"
  },
  {
    label: "Shell",
    keyword: ["shellscript", "bash", "sh", "shell", "zsh"],
    themeColor: "#89e051"
  },
  {
    label: "Shell Session",
    keyword: ["shellsession", "console"],
    themeColor: "#89e051"
  },
  {
    label: "Smalltalk",
    keyword: ["smalltalk"],
    themeColor: "#596706"
  },
  {
    label: "Solidity",
    keyword: ["solidity"],
    themeColor: "#aa6746"
  },
  {
    label: "Closure Templates",
    keyword: ["soy", "closure-templates"],
    themeColor: "#f88a18"
  },
  {
    label: "SPARQL",
    keyword: ["sparql"],
    themeColor: "#0c4b8a"
  },
  {
    label: "Splunk Query Language",
    keyword: ["splunk", "spl"],
    themeColor: "#f8be34"
  },
  {
    label: "SQL",
    keyword: ["sql"],
    themeColor: "#dad8d8"
  },
  {
    label: "SSH Config",
    keyword: ["ssh-config"],
    themeColor: "#577590"
  },
  {
    label: "Stata",
    keyword: ["stata"],
    themeColor: "#1a5f91"
  },
  {
    label: "Stylus",
    keyword: ["stylus", "styl"],
    themeColor: "#ff6347"
  },
  {
    label: "Svelte",
    keyword: ["svelte"],
    themeColor: "#4a4a55"
  },
  {
    label: "Swift",
    keyword: ["swift"],
    themeColor: "#f05138"
  },
  {
    label: "SystemVerilog",
    keyword: ["system-verilog"],
    themeColor: "#dae1c2"
  },
  {
    label: "Systemd Units",
    keyword: ["systemd"],
    themeColor: "#ff4500"
  },
  {
    label: "TalonScript",
    keyword: ["talonscript", "talon"],
    themeColor: "#f8be34"
  },
  {
    label: "Tasl",
    keyword: ["tasl"],
    themeColor: "#1e77bb"
  },
  {
    label: "Tcl",
    keyword: ["tcl"],
    themeColor: "#e4cc98"
  },
  {
    label: "Templ",
    keyword: ["templ"],
    themeColor: "#3f4c5a"
  },
  {
    label: "Terraform",
    keyword: ["terraform", "tf", "tfvars"],
    themeColor: "#844fba"
  },
  {
    label: "TeX",
    keyword: ["tex"],
    themeColor: "#3d6117"
  },
  {
    label: "TOML",
    keyword: ["toml"],
    themeColor: "#9c4221"
  },
  {
    label: "TypeScript with Tags",
    keyword: ["ts-tags", "lit"],
    themeColor: "#3178c6"
  },
  {
    label: "TSV",
    keyword: ["tsv"],
    themeColor: "#d0d0d0"
  },
  {
    label: "TSX",
    keyword: ["tsx"],
    themeColor: "#3178c6"
  },
  {
    label: "Turtle",
    keyword: ["turtle"],
    themeColor: "#009688"
  },
  {
    label: "Twig",
    keyword: ["twig"],
    themeColor: "#c1d026"
  },
  {
    label: "TypeScript",
    keyword: ["typescript", "ts"],
    themeColor: "#3178c6"
  },
  {
    label: "TypeSpec",
    keyword: ["typespec", "tsp"],
    themeColor: "#007acc"
  },
  {
    label: "Typst",
    keyword: ["typst", "typ"],
    themeColor: "#239dad"
  },
  {
    label: "V",
    keyword: ["v"],
    themeColor: "#5f7dbe"
  },
  {
    label: "Vala",
    keyword: ["vala"],
    themeColor: "#fbe5cd"
  },
  {
    label: "Visual Basic",
    keyword: ["vb", "cmd"],
    themeColor: "#945db7"
  },
  {
    label: "Verilog",
    keyword: ["verilog"],
    themeColor: "#b2b7f8"
  },
  {
    label: "VHDL",
    keyword: ["vhdl"],
    themeColor: "#adb2cb"
  },
  {
    label: "Vim Script",
    keyword: ["viml", "vim", "vimscript"],
    themeColor: "#199f4b"
  },
  {
    label: "Vue",
    keyword: ["vue"],
    themeColor: "#41b883"
  },
  {
    label: "Vue HTML",
    keyword: ["vue-html"],
    themeColor: "#41b883"
  },
  {
    label: "Vyper",
    keyword: ["vyper", "vy"],
    themeColor: "#363636"
  },
  {
    label: "WebAssembly",
    keyword: ["wasm"],
    themeColor: "#04133b"
  },
  {
    label: "Wenyan",
    keyword: ["wenyan", "文言"],
    themeColor: "#fcdfff"
  },
  {
    label: "WGSL",
    keyword: ["wgsl"],
    themeColor: "#5e7f9f"
  },
  {
    label: "Wikitext",
    keyword: ["wikitext", "mediawiki", "wiki"],
    themeColor: "#fc5757"
  },
  {
    label: "WebAssembly Interface Types",
    keyword: ["wit"],
    themeColor: "#04133b"
  },
  {
    label: "Wolfram",
    keyword: ["wolfram", "wl"],
    themeColor: "#dd1100"
  },
  {
    label: "XML",
    keyword: ["xml"],
    themeColor: "#0060ac"
  },
  {
    label: "XSL",
    keyword: ["xsl"],
    themeColor: "#eb8ceb"
  },
  {
    label: "YAML",
    keyword: ["yaml", "yml"],
    themeColor: "#cb171e"
  },
  {
    label: "ZenScript",
    keyword: ["zenscript"],
    themeColor: "#00bcd1"
  },
  {
    label: "Zig",
    keyword: ["zig"],
    themeColor: "#ec915c"
  },
  {
    label: "プレーンテキスト",
    keyword: ["plaintext", "text"],
    themeColor: "#ffd866"
  }
] as const satisfies Array<CodeBlockLanguageInfo>

/**
 * キーワードから言語に関する情報を取得する
 *
 * @param keyword - 言語のキーワード
 * @returns 言語に関する情報
 */
export const getLanguageInfo = (
  keyword: string
): {
  /** 言語の表示用ラベル */
  label: string
  /** 言語のテーマカラー */
  themeColor: string
  /** 言語の文字色を白にするかどうか */
  isLabelWhite: boolean
} => {
  const applicableLanguageInfo = LANGUAGE_INFO_DEFINITIONS.find(info =>
    info.keyword.some(k => k.toLowerCase() === keyword.toLowerCase())
  )

  if (!isDefined(applicableLanguageInfo)) {
    // throw new Error(`パース不可能な言語が指定されました: ${keyword}`)
    return {
      label: "プレーンテキスト",
      themeColor: "#ffd866",
      isLabelWhite: false
    }
  }

  const isLabelWhite = determineWhiteTextColor(applicableLanguageInfo.themeColor)

  return {
    label: applicableLanguageInfo.label,
    themeColor: applicableLanguageInfo.themeColor,
    isLabelWhite
  }
}
