import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'fs'
import { marked } from 'marked'

const tocs: { mdName: string, tocName: string }[] = [
  { mdName: 'index', tocName: '首页' },
  { mdName: 'main_benefits_of_vst3', tocName: 'VST 3 的优势' },
  { mdName: 'what_is_vst_sdk', tocName: 'VST 3 SDK' },
  { mdName: 'getting_started', tocName: '快速上手' },
  { mdName: 'tutorials', tocName: '教程' },
  { mdName: 'technical_documentation', tocName: '技术文档' },
  { mdName: 'vst3_forum', tocName: 'VST 论坛' },
  { mdName: 'miscellaneous', tocName: '其他' }
]

mkdirSync('docs', { recursive: true })
cpSync('md/Image', 'docs/Image', { force: true, recursive: true })

const template = readFileSync('template.html', 'utf8')
tocs.forEach(toc => {
  const { tocName, mdName } = toc

  const md = readFileSync(`md/${mdName}.md`, 'utf8')
  const html = template
    .replace('<!--markdown-body-->', marked(md))
    .replace('<!--toc-->', marked(tocs.map(x => `- [${x.tocName}](${x.mdName}.html)`).join('\n')))
    
  writeFileSync(`docs/${mdName}.html`, html)
})
  