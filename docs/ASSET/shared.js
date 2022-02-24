let isShowMenu, menuElement, ballElement, tocTree, curRenderNode
let nodeIsOpenMap = {}
function init() {
  hljs.highlightAll()
  isShowMenu = false
  menuElement = document.getElementById("menu")
  ballElement = document.getElementById("ball")
  tocTree = JSON.parse(document.getElementById("tocTreeData").getAttribute('toc-tree-data'))
  curRenderNode = { children: tocTree }
  renderToc('toc', false)
  controlMenu()
}
function renderToc(id, isAppend) {
  let element = document.getElementById(id)
  let innerHtml = isAppend ? element.innerHTML : ""
  for (let i = 0; i < curRenderNode.children.length; i++) {
    let node = curRenderNode.children[i]
    innerHtml += genTocItemHtml(node.id, node.url, node.name, node.children)
    nodeIsOpenMap[node.id] = false
  }
  nodeIsOpenMap[id] = true
  element.innerHTML = innerHtml
}
function flodToc(id) {
  findNodeById(id, tocTree)
  if (nodeIsOpenMap[id]) {
    let element = document.getElementById(id)
    element.innerHTML = genTocItemHtml(id, curRenderNode.url, curRenderNode.name, curRenderNode.children, true)
    nodeIsOpenMap[id] = false
  } else {
    renderToc(id, true)
  }
}
function findNodeById(id, source) {
  for (let i = 0; i < source.length; i++) {
    let node = source[i]
    if (node.id == id) {
      curRenderNode = node
    }
    findNodeById(id, node.children)
  }
}
function genTocItemHtml(id, url, name, children, onlyInner) {
  let inner = `<div class="fold" style="opacity:` + (children.length > 0 ? `1` : `0`) + `" onclick="flodToc('` + id + `')"><div class="fold-icon"></div></div><a class="toc-name" href="` + url + `">` + name + `</a>`
  return onlyInner ? inner : `<div class="toc-item" id="` + id + `">` + inner + `</div>`
}
function controlMenu(fromBtn) {
  if (fromBtn) { isShowMenu = !isShowMenu }
  if (document.body.offsetWidth > 1280) { isShowMenu = true }
  menuElement.style.display = isShowMenu ? "block" : "none"
  ballElement.style.transform = isShowMenu ? "rotate(45deg)" : "rotate(0deg)"
}