var FRAMEWORKS = [
  { id: 'react', label: 'React', color: '#61dafb', bg: '#e6f9ff' },
  { id: 'angular', label: 'Angular', color: '#dd0031', bg: '#ffe6eb' },
  { id: 'vue', label: 'Vue', color: '#42b883', bg: '#e6f7f1' },
  { id: 'svelte', label: 'Svelte', color: '#ff3e00', bg: '#fff0eb' },
  { id: 'html', label: 'HTML + CSS', color: '#e44d26', bg: '#fff3ee' },
  { id: 'other', label: 'Other', color: '#64748b', bg: '#f1f5f9' }
]

export const SurveyPhase2 = {
  extends: 'Flex',
  flow: 'y',
  gap: 'B2',

  scope: {
    buildSection: function (label) {
      var div = document.createElement('div')
      div.style.cssText = 'display:flex;flex-direction:column;gap:12px'
      var lbl = document.createElement('label')
      lbl.textContent = label
      lbl.style.cssText = 'font-size:12px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.05em'
      div.appendChild(lbl)
      return div
    },

    buildOptionButtons: function (s, node, fieldName, options) {
      var grid = document.createElement('div')
      grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px'
      options.forEach(function (opt) {
        var btn = document.createElement('button')
        btn.type = 'button'
        btn.textContent = opt
        btn.setAttribute('data-field', fieldName)
        btn.setAttribute('data-val', opt)
        var isActive = s[fieldName] === opt
        btn.style.cssText = 'padding:10px 12px;border-radius:12px;font-size:13px;font-weight:600;cursor:pointer;text-align:left;transition:all 0.15s;' +
          (isActive ? 'background:#eef2ff;border:2px solid #4f46e5;color:#4f46e5' : 'background:white;border:2px solid #e2e8f0;color:#475569')
        btn.addEventListener('click', function () {
          grid.querySelectorAll('button').forEach(function (b) {
            var a = b === btn
            b.style.background = a ? '#eef2ff' : 'white'
            b.style.borderColor = a ? '#4f46e5' : '#e2e8f0'
            b.style.color = a ? '#4f46e5' : '#475569'
          })
          var u = {}; u[fieldName] = opt; s.update(u)
        })
        grid.appendChild(btn)
      })
      node.appendChild(grid)
    },

    buildUploadArea: function (s, node, fieldName, label) {
      var preview = document.createElement('div')
      preview.setAttribute('data-preview', fieldName)
      preview.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-top:4px'

      var wrapper = document.createElement('div')
      wrapper.style.cssText = 'position:relative;border:2px dashed #e2e8f0;border-radius:20px;padding:36px 20px;text-align:center;cursor:pointer;transition:border 0.15s'
      var txt = document.createElement('div')
      txt.textContent = label || 'Click to upload screenshots'
      txt.style.cssText = 'font-size:13px;font-weight:700;color:#64748b;pointer-events:none'
      wrapper.appendChild(txt)

      var input = document.createElement('input')
      input.type = 'file'
      input.multiple = true
      input.accept = 'image/*'
      input.style.cssText = 'position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%'
      input.addEventListener('change', function (e) {
        Array.from(e.target.files).forEach(function (file) {
          var reader = new FileReader()
          reader.onloadend = function () {
            var img = document.createElement('img')
            img.src = reader.result
            img.style.cssText = 'width:64px;height:64px;object-fit:cover;border-radius:10px;border:1px solid #e2e8f0'
            preview.appendChild(img)
            var current = s[fieldName] || []
            var u = {}; u[fieldName] = current.concat([reader.result]); s.update(u)
          }
          reader.readAsDataURL(file)
        })
        input.value = ''
      })
      wrapper.appendChild(input)
      node.appendChild(wrapper)
      node.appendChild(preview)
    },

    buildMetricsRow: function (s, node, metricsKey, screenshotsKey) {
      var grid = document.createElement('div')
      grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:20px;background:#f8fafc;border-radius:16px;border:1px solid #f1f5f9'

      var left = document.createElement('div')
      left.style.cssText = 'display:flex;flex-direction:column;gap:8px'
      var leftLbl = document.createElement('label')
      leftLbl.textContent = 'PERFORMANCE DATA'
      leftLbl.style.cssText = 'font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.05em'
      var textarea = document.createElement('textarea')
      textarea.placeholder = 'Lighthouse score, bundle size, custom KPIs...'
      textarea.style.cssText = 'width:100%;height:90px;padding:12px;border-radius:10px;border:1px solid #e2e8f0;font-size:12px;font-family:monospace;color:#334155;resize:vertical;box-sizing:border-box;outline:none;background:white'
      textarea.value = s[metricsKey] || ''
      textarea.addEventListener('input', function (e) {
        var u = {}; u[metricsKey] = e.target.value; s.update(u)
      })
      left.appendChild(leftLbl)
      left.appendChild(textarea)

      var right = document.createElement('div')
      right.style.cssText = 'display:flex;flex-direction:column;gap:8px'
      var rightLbl = document.createElement('label')
      rightLbl.textContent = 'METRICS SCREENSHOT'
      rightLbl.style.cssText = 'font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.05em'
      right.appendChild(rightLbl)

      var preview = document.createElement('div')
      preview.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-top:4px'
      var uploadWrap = document.createElement('div')
      uploadWrap.style.cssText = 'position:relative;border:2px dashed #e2e8f0;border-radius:12px;padding:20px 10px;text-align:center;cursor:pointer;background:white'
      var uploadTxt = document.createElement('div')
      uploadTxt.textContent = 'Add chart / viz'
      uploadTxt.style.cssText = 'font-size:11px;font-weight:700;color:#94a3b8;pointer-events:none'
      uploadWrap.appendChild(uploadTxt)
      var uploadInput = document.createElement('input')
      uploadInput.type = 'file'
      uploadInput.multiple = true
      uploadInput.accept = 'image/*'
      uploadInput.style.cssText = 'position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%'
      uploadInput.addEventListener('change', function (e) {
        Array.from(e.target.files).forEach(function (file) {
          var reader = new FileReader()
          reader.onloadend = function () {
            var img = document.createElement('img')
            img.src = reader.result
            img.style.cssText = 'width:40px;height:40px;object-fit:cover;border-radius:8px;border:1px solid #e2e8f0'
            preview.appendChild(img)
            var current = s[screenshotsKey] || []
            var u = {}; u[screenshotsKey] = current.concat([reader.result]); s.update(u)
          }
          reader.readAsDataURL(file)
        })
        uploadInput.value = ''
      })
      uploadWrap.appendChild(uploadInput)
      right.appendChild(uploadWrap)
      right.appendChild(preview)

      grid.appendChild(left)
      grid.appendChild(right)
      node.appendChild(grid)
    }
  },

  onRender: (el, s) => {
    if (el.__init) return
    el.__init = true
    var node = el.node
    node.style.cssText = 'display:flex;flex-direction:column;gap:24px;padding:32px 40px'

    // Framework selector at the very top
    var fwSection = document.createElement('div')
    fwSection.style.cssText = 'display:flex;flex-direction:column;gap:14px;padding:20px 24px;background:#f8fafc;border-radius:20px;border:2px solid #e2e8f0'

    var fwLabel = document.createElement('div')
    fwLabel.style.cssText = 'font-size:12px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.05em'
    fwLabel.textContent = 'Which framework are you comparing against?'
    fwSection.appendChild(fwLabel)

    var fwGrid = document.createElement('div')
    fwGrid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:8px'

    var customInput = document.createElement('input')
    customInput.type = 'text'
    customInput.placeholder = 'Specify framework...'
    customInput.style.cssText = 'display:none;width:100%;padding:10px 14px;border-radius:12px;border:2px solid #4f46e5;font-size:13px;color:#334155;box-sizing:border-box;outline:none;font-family:inherit;margin-top:4px'
    customInput.value = s.comparisonFrameworkCustom || ''
    customInput.addEventListener('input', function (e) {
      s.update({ comparisonFrameworkCustom: e.target.value })
    })

    // Title el — dynamically updated by framework selection
    var titleEl = null

    FRAMEWORKS.forEach(function (fw) {
      var btn = document.createElement('button')
      btn.type = 'button'
      var isActive = s.comparisonFramework === fw.id
      btn.style.cssText = 'padding:10px 12px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.15s;border:2px solid;' +
        (isActive
          ? 'background:' + fw.bg + ';border-color:' + fw.color + ';color:' + fw.color
          : 'background:white;border-color:#e2e8f0;color:#475569')
      btn.textContent = fw.label
      btn.addEventListener('click', function () {
        fwGrid.querySelectorAll('button').forEach(function (b, i) {
          var f = FRAMEWORKS[i]
          var a = b === btn
          b.style.background = a ? f.bg : 'white'
          b.style.borderColor = a ? f.color : '#e2e8f0'
          b.style.color = a ? f.color : '#475569'
        })
        s.update({ comparisonFramework: fw.id })
        // Show/hide custom input
        customInput.style.display = fw.id === 'other' ? 'block' : 'none'
        // Update section title
        if (titleEl) {
          var name = fw.id === 'other'
            ? (s.comparisonFrameworkCustom || 'Other Framework')
            : fw.label
          titleEl.textContent = '2. ' + name + ' Comparison'
        }
        // Update section border color
        fwSection.style.borderColor = fw.color
      })
      fwGrid.appendChild(btn)
    })

    fwSection.appendChild(fwGrid)
    fwSection.appendChild(customInput)
    if (s.comparisonFramework === 'other') customInput.style.display = 'block'
    // Also update border if already selected
    var selectedFw = FRAMEWORKS.find(function (f) { return f.id === s.comparisonFramework })
    if (selectedFw) fwSection.style.borderColor = selectedFw.color

    node.appendChild(fwSection)

    // Title (updates based on framework selection)
    var titleRow = document.createElement('div')
    titleRow.style.cssText = 'display:flex;align-items:center;gap:14px;padding-bottom:20px;border-bottom:1px solid #f1f5f9'
    var fwName = s.comparisonFramework
      ? (FRAMEWORKS.find(function (f) { return f.id === s.comparisonFramework }) || {}).label || 'Other'
      : 'Other Framework'
    titleRow.innerHTML = '<div style="padding:10px;background:#e0e7ff;border-radius:14px"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#4338ca" stroke-width="2"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="8" height="8" rx="1"/></svg></div>' +
      '<div><h2 data-phase2-title style="font-size:22px;font-weight:900;color:#0f172a;margin:0">2. ' + fwName + ' Comparison</h2><p style="font-size:13px;color:#64748b;margin:4px 0 0;font-weight:500">Benchmarking against the selected framework.</p></div>'
    titleEl = titleRow.querySelector('[data-phase2-title]')
    node.appendChild(titleRow)

    // GitHub URL
    var githubSection = el.scope.buildSection('GitHub Repo / Sandbox URL')
    var githubWrap = document.createElement('div')
    githubWrap.style.cssText = 'position:relative'
    githubWrap.innerHTML = '<svg style="position:absolute;left:14px;top:14px;color:#94a3b8" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>'
    var githubInput = document.createElement('input')
    githubInput.type = 'text'
    githubInput.placeholder = 'https://github.com/comparison-repo'
    githubInput.style.cssText = 'width:100%;padding:14px 14px 14px 44px;border-radius:14px;border:2px solid #f1f5f9;font-size:14px;color:#334155;box-sizing:border-box;outline:none;transition:border 0.15s;font-family:inherit'
    githubInput.value = s.comparisonGithub || ''
    githubInput.addEventListener('input', function (e) { s.update({ comparisonGithub: e.target.value }) })
    githubInput.addEventListener('focus', function () { githubInput.style.borderColor = '#4f46e5' })
    githubInput.addEventListener('blur', function () { githubInput.style.borderColor = '#f1f5f9' })
    githubWrap.appendChild(githubInput)
    githubSection.appendChild(githubWrap)
    node.appendChild(githubSection)

    // Screenshot upload
    var uploadSection = el.scope.buildSection('Attach Screenshots')
    el.scope.buildUploadArea(s, uploadSection, 'comparisonScreenshots', 'Click to upload output screenshots')
    node.appendChild(uploadSection)

    // Accuracy options
    var accSection = el.scope.buildSection('Initial accuracy?')
    el.scope.buildOptionButtons(s, accSection, 'comparisonAccuracy', ['Fully correct', 'Mostly correct', 'Partially correct', 'Incorrect'])
    node.appendChild(accSection)

    // Iterations options
    var iterSection = el.scope.buildSection('Iterations to stabilize?')
    el.scope.buildOptionButtons(s, iterSection, 'comparisonIterations', ['0', '1-2', '3-5', '6+'])
    node.appendChild(iterSection)

    // Metrics row
    var metricsSection = el.scope.buildSection('Performance Metrics')
    el.scope.buildMetricsRow(s, metricsSection, 'comparisonMetrics', 'comparisonMetricsScreenshots')
    node.appendChild(metricsSection)
  }
}
