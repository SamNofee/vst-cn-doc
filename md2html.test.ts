import { Md2html, File } from './md2html'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import Chance from 'chance'
import assert from 'power-assert'

describe('Build vst html', () => {
  it('should work', () => {
    const files = [
      { mdName: 'index', tocName: '首页' },
      { mdName: 'main_benefits_of_vst3', tocName: 'VST 3 的优势' },
      { mdName: 'what_is_vst_sdk', tocName: 'VST 3 SDK' },
      { mdName: 'getting_started', tocName: '快速上手' },
      { mdName: 'tutorials', tocName: '教程' },
      { mdName: 'technical_documentation', tocName: '技术文档' },
      { mdName: 'vst3_forum', tocName: 'VST 论坛' },
      { mdName: 'miscellaneous', tocName: '其他' }
    ]
    const cpPaths = [ 'Image' ]
    const template = readFileSync('template.html', 'utf8')

    const md2html = new Md2html('md', 'docs', files, { cpPaths, template })
    md2html.build()
  })
})

describe('Md2html unit test', () => {
  let testMdPath: string
  let testHtmlPath: string
  let testMdName: string
  let testTocName: string
  let testMd2html: Md2html
  let testFiles: File[]

  const testMdContent = '# Title\n\n**Demo**\n> Mark'
  const testMdContentHtml = '<h1 id="title">Title</h1>\n' + 
    '<p><strong>Demo</strong></p>\n<blockquote>\n' + 
    '<p>Mark</p>\n</blockquote>'

  const chance = new Chance()

  before(() => {
    const hash = chance.hash()
    testMdPath = join('temp', hash, 'md')
    testHtmlPath = join('temp', hash, 'docs')
    testMdName = chance.word()
    testTocName = chance.word()

    mkdirSync(testMdPath, { recursive: true })
    mkdirSync(testHtmlPath, { recursive: true })
    writeFileSync(join(testMdPath, `${testMdName}.md`), testMdContent)

    testFiles = [ { mdName: testMdName, tocName: testTocName } ]
    testMd2html = new Md2html(testMdPath, testHtmlPath, testFiles)
  })

  it('genToc: should work', () => {
    const toc = testMd2html.genToc(testFiles)
    const expectToc = `<ul>\n<li><a href="${testMdName}.html">${testTocName}</a></li>\n</ul>`
    assert(toc.trim() === expectToc.trim())
  })

  it('build: should work', () => {
    testMd2html.build()
    const html = readFileSync(join(testHtmlPath, `${testMdName}.html`), 'utf8')
    assert(html.indexOf(testMdContentHtml) !== -1)
  })

  it('build: custom genToc', () => {
    testMd2html.build({ genToc: () => 'custom genToc' })
    const html = readFileSync(join(testHtmlPath, `${testMdName}.html`), 'utf8')
    assert(html.indexOf('custom genToc') !== -1)
  })

  it('build: custom afterReadMd', () => {
    testMd2html.build({ afterReadMd: (md) => `${md}\n# New Title` })
    const html = readFileSync(join(testHtmlPath, `${testMdName}.html`), 'utf8')
    assert(html.indexOf(`${testMdContentHtml}\n<h1 id="new-title">New Title</h1>`) !== -1)
  })
})