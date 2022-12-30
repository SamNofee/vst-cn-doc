// The MIT License (MIT)

// Copyright (c) 2022, Sam Nofee

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'fs'
import { join } from 'path'
import { marked } from 'marked'

export interface File {
  mdName: string,
  tocName?: string
}

export class Md2html {

  constructor(mdPath: string, htmlPath: string, files: File[], options?: {
    cpPaths?: string[],
    template?: string
  }) {
    this.mdPath = mdPath
    this.htmlPath = htmlPath
    this.files = files

    mkdirSync(htmlPath, { recursive: true })

    options?.cpPaths?.length && this.cpPathsFromMdToHtml(options.cpPaths)
    options?.template && (this.template = options.template)
  }

  private readonly tocReplacement = '<!--toc-->'
  private readonly markdownBodyReplacement = '<!--markdown-body-->'

  private mdPath: string
  private htmlPath: string
  private files: File[]
  private template: string = `${this.tocReplacement}${this.markdownBodyReplacement}`

  private cpPathsFromMdToHtml(cpPaths: string[]) {
    cpPaths.forEach(cpPath => cpSync(
      join(this.mdPath, cpPath),
      join(this.htmlPath, cpPath),
      { force: true, recursive: true }
    ))
  }

  public genToc(files: File[]): string {
    return marked(files.map(x => `- [${x.tocName}](${x.mdName}.html)`).join('\n'))
  }

  public build(lifecycle?: {
    genToc?: (files: File[]) => string,
    afterReadMd?: (md: string, file: File) => string,
    afterGenMarkdownBody?: (markdownBody: string, file: File) => string,
    beforeWriteHtml?: (html: string, file: File) => string
  }) {
    const genToc = lifecycle?.genToc || this.genToc
    const toc = genToc(this.files)

    this.files.forEach(file => {
      const { mdName } = file

      let md = readFileSync(join(this.mdPath, `${mdName}.md`), 'utf8')
      lifecycle?.afterReadMd && (md = lifecycle.afterReadMd(md, file))

      let markdownBody = marked(md)
      lifecycle?.afterGenMarkdownBody && (markdownBody = lifecycle.afterGenMarkdownBody(markdownBody, file))

      let html = this.template
        .replace(this.markdownBodyReplacement, markdownBody)
        .replace(this.tocReplacement, toc)

      lifecycle?.beforeWriteHtml && (html = lifecycle.beforeWriteHtml(html, file))
      writeFileSync(join(this.htmlPath, `${mdName}.html`), html)
    })
  }

}
  