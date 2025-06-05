function createTreeNode (key, value) {
  const container = document.createElement('div')
  container.className = 'tree-node'

  const content = document.createElement('div')
  content.className = 'tree-content'

  const keySpan = document.createElement('span')
  keySpan.className = 'tree-key'
  keySpan.textContent = key + ': '

  const valueSpan = document.createElement('span')
  valueSpan.className = 'tree-value'

  content.appendChild(keySpan)
  content.appendChild(valueSpan)
  container.appendChild(content)

  if (typeof value === 'object' && value !== null) {
    const expander = document.createElement('span')
    expander.className = 'tree-expander'
    expander.textContent = '▶'
    content.insertBefore(expander, keySpan)

    const childContainer = document.createElement('div')
    childContainer.className = 'tree-children'
    childContainer.style.display = 'none'
    container.appendChild(childContainer)

    for (const [childKey, childValue] of Object.entries(value)) {
      childContainer.appendChild(createTreeNode(childKey, childValue))
    }

    content.addEventListener('click', () => {
      const isExpanded = childContainer.style.display !== 'none'
      expander.textContent = isExpanded ? '▶' : '▼'
      childContainer.style.display = isExpanded ? 'none' : 'block'
    })

    valueSpan.textContent = '{...}'
  } else {
    valueSpan.textContent =
      typeof value === 'string' ? `"${value}"` : String(value)
  }

  return container
}

function displayDOMInfo () {
  console.log('displayDOMInfo called')
  chrome.storage.local.get('domInfo', ({ domInfo }) => {
    console.log('Retrieved domInfo:', domInfo)

    let output = document.getElementById('debug-output')
    if (!output) {
      console.log('Creating debug-output div')
      output = document.createElement('div')
      output.id = 'debug-output'
      document.body.appendChild(output)
    }

    output.innerHTML = ''

    if (domInfo && domInfo.platformData) {
      console.log('Creating tree view for platform data')
      const treeView = document.createElement('div')
      treeView.className = 'tree-view'
      treeView.appendChild(createTreeNode('root', domInfo.platformData))
      output.appendChild(treeView)
    } else {
      output.innerHTML =
        '<div class="debug-item">Waiting for platform data...</div>'
    }
  })
}

function updatePlatformData (data) {
  console.log('updatePlatformData called with:', data)

  let output = document.getElementById('debug-output')
  if (!output) {
    console.log('Creating debug-output div')
    output = document.createElement('div')
    output.id = 'debug-output'
    document.body.appendChild(output)
  }

  output.innerHTML = ''

  const treeView = document.createElement('div')
  treeView.className = 'tree-view'
  treeView.appendChild(createTreeNode('root', data))
  output.appendChild(treeView)
}

// Listen for platform updates
chrome.runtime.onMessage.addListener(message => {
  console.log('Received message:', message)
  if (message.type === 'PLATFORM_UPDATE') {
    updatePlatformData(message.data)
  }
})

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired')

  // Add styles
  const style = document.createElement('style')
  style.textContent = `
    .tree-view {
      font-family: monospace;
      font-size: 14px;
      padding: 12px;
    }
    .tree-node {
      margin-left: 20px;
    }
    .tree-content {
      cursor: pointer;
      padding: 2px 0;
    }
    .tree-content:hover {
      background: rgba(0,0,0,0.05);
    }
    .tree-expander {
      display: inline-block;
      width: 20px;
      color: #666;
    }
    .tree-key {
      color: #881391;
    }
    .tree-value {
      color: #1a1aa6;
    }
    .tree-children {
      margin-left: 20px;
      border-left: 1px dotted #ccc;
    }
    .debug-item {
      padding: 12px;
      color: #666;
      font-family: system-ui;
    }
  `
  document.head.appendChild(style)

  displayDOMInfo()
})
