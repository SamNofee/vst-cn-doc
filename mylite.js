/*
 * No Node_modules
 * No SPA
 * No SSR
 * No Conceal
 * No Chunk
 * Just run mylite.js with Node.js
 * Then we can transform markdown 2 html
 * Without limit
 *
 * Mylite.js, Copyright (c) 2021-2022, Sam Nofee. (BSD Licensed)
 */

const Marked = require('./marked.js')
const Fs = require('fs')
const Path = require('path')

/*
 * Usage
 * 1. Copy mylite.js to you work folder
 * 2. Modify Config in mylite.js
 * 3. run " node mylite.js "
 */

const Config = {
  // The title of your document
  title: "VST中文文档",

  // Which tags will be rendered into table of contents
  tocRenderUseFourTags: ['h2', 'h3', 'h4', 'h5'],

  // The folder where markdown file store
  inputFolder: Path.resolve("./md/"),

  // The folder where html file store
  outputFolder: Path.resolve("./docs/"),

  // The folders will be copied directly and the item should contain source and target attribute
  copy: [{
    source: Path.resolve("./md/IMAGE/"),
    target: Path.resolve("./docs/IMAGE/")
  }, {
    source: Path.resolve("./md/ASSET/"),
    target: Path.resolve("./docs/ASSET/")
  }],

  // Which markdown file will be generated and the title of this file
  pagesOrder: {
    "WhatIsVST": "什么是VST",
    "MainBenefitsOfVST3": "VST3的主要优点",
    "WhatIsTheVST3SDK": "什么是VST3 SDK",
    "GettingStarted": "快速上手",
    "Tutorials": "教程",
    "TechnicalDocumentation": "技术文档",
    "FrequentlyAskedQuestions": "常见问题",
    "VST3Forum": "VST论坛",
    "Miscellaneous": "其他"
  },

  // The template of generation process and the `{{?}}` of mdHtmlTemp will be replaced by the string of "Config[?]" which is customizable
  // {{tocTreeData}} is a json string will be generated while a markdown file to html file
  // {{md2html}} is the result string will be generated while a markdown file to html file
  mdHtmlTemp: `
  <!DOCTYPE html>
  <head>
    <title>{{title}}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./ASSET/shared.css">
    <link rel="stylesheet" href="./ASSET/markdown.css">
    <link rel="stylesheet" href="./ASSET/highlight.min.css">
    <script src="./ASSET/highlight.min.js"></script>
    <script src="./ASSET/shared.js"></script>
  </head>
  <body onresize="controlMenu()" onload="init()">
    <template id="tocTreeData" toc-tree-data='{{tocTreeData}}'></template>
    <div id="menu">
      <div class="menu-box">
        <div id="toc">
        </div>
      </div>
      <div class="menu-bottom">
        <a href="https://github.com/SamNofee/vst-cn-doc">Github</a><a href="/">首页</a>
      </div>
    </div>
    <div id="ball" onclick="controlMenu(true)">
      <div class="ball-icon"></div>
    </div>
    <div class="article-body">
      <article class="markdown-body" style="padding-bottom: 100px;">{{md2html}}</article>
    </div>
  </body>
  `,

  // The index page html template and the `{{?}}` of indexHtmlTemp will be replaced by the string of "Config[?]" which is customizable
  // {{firstPage}} is the url of the page that first declare in `pagesOrder` 
  indexHtmlTemp: `
  <!DOCTYPE html>
  <head>
    <title>{{title}}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>html{height: 100%;margin: 0px;padding: 0px;}</style>
  </head>
  <body style="margin: 0px;padding: 0px;align-items: center;overflow: hidden;min-width: 290px;width: 100%;height: 100%;display: flex;justify-content: center;">
    <div style="width: 290px;display: flex;flex-wrap: wrap;justify-content: space-between;">
      <div style="font-weight: lighter;width: 100%;font-size: 48px;margin-bottom: 10px;text-align: center;">VST中文文档</div>
      <a href="{{firstPage}}" style="color: black;border: 1px solid black;font-size: 16px;text-align: center;display: block;border-radius: 20px;text-decoration: none;height: 40px;width: 230px;line-height: 40px;">开始 / GETTING START</a>
      <a href="https://github.com/SamNofee/vst-cn-doc" style="color: black;border: 1px solid black;font-size: 16px;text-align: center;display: block;border-radius: 20px;text-decoration: none;height: 40px;width: 40px;display: flex;align-items: center;justify-content: center;">
        <div style="width: 20px;height: 20px;background-size: 100% 100%;background-image:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPjxwYXRoIGQ9Ik0yOS4zNDQ0IDMwLjQ3NjdDMzEuNzQ4MSAyOS45NzcxIDMzLjkyOTIgMjkuMTEwOSAzNS42MjQ3IDI3LjgzOTNDMzguNTIwMiAyNS42Njc3IDQwIDIyLjMxMzcgNDAgMTlDNDAgMTYuNjc1NCAzOS4xMTg3IDE0LjUwNTEgMzcuNTkyOSAxMi42NjY5QzM2Ljc0MjcgMTEuNjQyNiAzOS4yMjk1IDQuMDAwMDEgMzcuMDIgNS4wMjkzMUMzNC44MTA1IDYuMDU4NjEgMzEuNTcwOCA4LjMzNjkxIDI5Ljg3MjYgNy44MzQxQzI4LjA1NDUgNy4yOTU3NyAyNi4wNzMzIDcuMDAwMDEgMjQgNy4wMDAwMUMyMi4xOTkyIDcuMDAwMDEgMjAuNDY3OSA3LjIyMzEzIDE4Ljg1MjYgNy42MzQ1MkMxNi41MDQ2IDguMjMyNDkgMTQuMjU5MSA2LjAwMDAxIDEyIDUuMDI5MzFDOS43NDA4NiA0LjA1ODYxIDEwLjk3MzYgMTEuOTYzMyAxMC4zMDI2IDEyLjc5NDZDOC44NDExOSAxNC42MDUyIDggMTYuNzI4OSA4IDE5QzggMjIuMzEzNyA5Ljc5MDg2IDI1LjY2NzcgMTIuNjg2MyAyNy44MzkzQzE0LjYxNTEgMjkuMjg1OCAxNy4wMzQgMzAuMjA3NyAxOS43NDAxIDMwLjY2MjEiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMTkuNzQwMiAzMC42NjJDMTguNTgxNyAzMS45MzcyIDE4LjAwMjQgMzMuMTQ4IDE4LjAwMjQgMzQuMjk0NkMxOC4wMDI0IDM1LjQ0MTEgMTguMDAyNCAzOC4zNDY1IDE4LjAwMjQgNDMuMDEwOCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yOS4zNDQzIDMwLjQ3NjdDMzAuNDQyMSAzMS45MTc1IDMwLjk5MSAzMy4yMTEyIDMwLjk5MSAzNC4zNTc3QzMwLjk5MSAzNS41MDQzIDMwLjk5MSAzOC4zODg2IDMwLjk5MSA0My4wMTA4IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTYgMzEuMjE1NkM2Ljg5ODg3IDMxLjMyNTUgNy41NjU1NCAzMS43Mzg4IDggMzIuNDU1NUM4LjY1MTY5IDMzLjUzMDQgMTEuMDc0MiAzNy41MTgxIDEzLjgyNTEgMzcuNTE4MUMxNS42NTkxIDM3LjUxODEgMTcuMDUxNSAzNy41MTgxIDE4LjAwMjQgMzcuNTE4MSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==');"></div>
      </a>
    </div>
  </body>`,
}

// Mylite namespace var
let Mylite = {

}

// MAIN
const MAIN = () => {
  isRunUnitTest()
  handleConfigObj()
  initOutputFolder()
  copyToOutputFolder()
  let inputFolderStateTree = getStateTree(Config.inputFolder, { isGetFileContent: true, isGetChildren: false })
  let pagesStateTree = orderStateTreeByConfig(inputFolderStateTree[0].children)
  pagesStateTree = parseHtmlByStateTree(pagesStateTree)
  let tocTreeData = genTocTreeDataByStateTree(pagesStateTree)
  pagesStateTree = genHtmlContentByStateTree(pagesStateTree, tocTreeData)
  for (let i = 0; i < pagesStateTree.length; i++) {
    Fs.writeFileSync(Path.resolve(Config.outputFolder, pagesStateTree[i].basename + ".html"), pagesStateTree[i].content, "utf-8")
  }
  Fs.writeFileSync(Path.resolve(Config.outputFolder, "index.html"), replaceTemplateByObj(Config.indexHtmlTemp, {
    title: Config.title,
    firstPage: Object.keys(Config.pagesOrder)[0] + ".html"
  }), "utf-8")
  console.log("Success!")
}

const isRunUnitTest = () => {
  //
}

const handleConfigObj = () => {
  //
}

const initOutputFolder = () => {
  if (Fs.existsSync(Config.outputFolder)) {
    Fs.rmSync(Config.outputFolder, { recursive: true })
  }
  Fs.mkdirSync(Config.outputFolder)
}

const copyToOutputFolder = () => {
  for (let i = 0; i < Config.copy.length; i++) {
    Fs.cpSync(Config.copy[i].source, Config.copy[i].target, { recursive: true })
  }
}

const orderStateTreeByConfig = (source) => {
  let output = []
  let keys = Object.keys(Config.pagesOrder)
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < source.length; j++) {
      if (source[j].basename === keys[i]) {
        output.push(source[j])
      }
    }
  }
  return output
}

const parseHtmlByStateTree = (source) => {
  let output = []
  for (let i = 0; i < source.length; i++) {
    source[i].content = Marked.marked.parse(source[i].content)
    output.push(source[i])
  }
  return output
}

// The node of tocTreeData contain: name, id, url, children
const genTocTreeDataByStateTree = (source) => {
  let output = []
  for (let i = 0; i < source.length; i++) {
    let node = {}
    node.name = Config.pagesOrder[source[i].basename]
    node.id = Math.random().toString(36).substring(3, 12)
    node.url = source[i].basename + ".html"
    node.children = genTocTreeDataChildren(source[i].content.match(/<h[0-9]\sid=\".*?\">/g), node.url)
    output.push(node)
  }
  return output
}

const genTocTreeDataChildren = (arr, prevUrl) => {
  let output = []
  for (let i = 0; i < arr.length; i++) {
    let node = {}
    node.name = arr[i].split('"')[1]
    node.url = prevUrl + "#" + node.name
    node.id = Math.random().toString(36).substring(3, 12)
    node.children = []

    // This is a bad way to transform A to B and it will be optimized later
    // A = ['<h1 id="1">','<h2 id="2">','<h3 id="3">']
    // B = [{name:"1",children:[{name:"2",children:[{name:"3",children:[{}]}]}]}]
    if (arr[i].substring(1, 3) === Config.tocRenderUseFourTags[0]) {
      output.push(node)
    } else if (arr[i].substring(1, 3) === Config.tocRenderUseFourTags[1]) {
      if (output.length === 0) {
        output.push(tocTreeDefaultNode())
      }
      output[output.length - 1].children.push(node)
    } else if (arr[i].substring(1, 3) === Config.tocRenderUseFourTags[2]) {
      if (output.length === 0) {
        output.push(tocTreeDefaultNode())
      }
      if (output[output.length - 1].children.length === 0) {
        output[output.length - 1].children.push(tocTreeDefaultNode())
      }
      output[output.length - 1].children[output[output.length - 1].children.length - 1].children.push(node)
    } else if (arr[i].substring(1, 3) === Config.tocRenderUseFourTags[3]) {
      if (output.length === 0) {
        output.push(tocTreeDefaultNode())
      }
      if (output[output.length - 1].children.length === 0) {
        output[output.length - 1].children.push(tocTreeDefaultNode())
      }
      if (output[output.length - 1].children[output[output.length - 1].children.length - 1].children.length === 0) {
        output[output.length - 1].children[output[output.length - 1].children.length - 1].children.push(tocTreeDefaultNode())
      }
      output[output.length - 1].children[output[output.length - 1].children.length - 1].children[output[output.length - 1].children[output[output.length - 1].children.length - 1].children.length - 1].children.push(node)
    }
  }
  return output
}

const tocTreeDefaultNode = () => {
  return {
    name: "",
    url: "",
    id: Math.random().toString(36).substring(3, 12),
    children: []
  }
}

const genHtmlContentByStateTree = (source, tocTreeData) => {
  let output = []
  for (let i = 0; i < source.length; i++) {
    source[i].content = replaceTemplateByObj(Config.mdHtmlTemp, {
      title: Config.title,
      tocTreeData: JSON.stringify(tocTreeData),
      md2html: source[i].content
    })
    output.push(source[i])
  }
  return output
}

const getState = (path, { isGetFileContent } = { isGetFileContent: false }) => {
  let state = null
  try {
    const stat = Fs.statSync(path)
    state = {}
    state.type = stat.isFile() ? "file" : "folder"
    state.content = (stat.isFile() && isGetFileContent) ? Fs.readFileSync(path, "utf-8") : ""
    state.path = path
    state.extension = Path.extname(path)
    state.basename = Path.basename(path, state.extension)
    state.children = []
  } catch (e) {
    console.error(e)
  }
  return state
}

const getStateTree = (path, { isGetFileContent, isGetChildren } = { isGetFileContent: false, isGetChildren: true }) => {
  let tree = []
  try {
    let rootState = getState(path)
    if (rootState.type == "folder") {
      const list = Fs.readdirSync(path)
      for (let i = 0; i < list.length; i++) {
        let state = getState(Path.join(path, list[i]), { isGetFileContent: isGetFileContent })
        if (state.type == "file") {
          rootState.children.push(state)
        } else {
          rootState.children.push(getStateTree(state.path, { isGetFileContent: isGetFileContent, isGetChildren: isGetChildren }))
        }
      }
      tree.push(rootState)
    }
  } catch (e) {
    console.error(e)
  }
  return tree
}

// @.T("{{demo}}",{demo:"demo"})=="demo").E(false)
const replaceTemplateByObj = (template, obj) => {
  return template.replace(/{{.*?}}/g, (word) => {
    const key = word.slice(2, -2)
    return obj[key]
  })
}
const replaceTemplateByObjTest = () => {
  if(replaceTemplateByObj("{{demo}}",{demo:"demo"})=="demo") throw "replaceTemplateByObj can not work"
}



//MAIN()
replaceTemplateByObjTest()