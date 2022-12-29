import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'fs'
import { marked } from 'marked'

mkdirSync('docs', { recursive: true })
cpSync('md/Image', 'docs/Image', { force: true, recursive: true })
const template = readFileSync('template.html', 'utf8')
const md = readFileSync('md/technical_documentation.md', 'utf8')
writeFileSync('docs/index.html', template.replace('<!--markdown-body-->', marked(md)))