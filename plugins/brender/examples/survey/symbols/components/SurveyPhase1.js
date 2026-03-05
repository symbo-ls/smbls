export const SurveyPhase1 = {
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

    buildInput: function (s, placeholder, stateKey, icon) {
      var wrap = document.createElement('div')
      wrap.style.cssText = 'position:relative'
      if (icon) wrap.innerHTML = icon
      var input = document.createElement('input')
      input.type = 'text'
      input.placeholder = placeholder
      input.style.cssText = 'width:100%;padding:14px 14px 14px ' + (icon ? '44px' : '14px') + ';border-radius:14px;border:2px solid #f1f5f9;font-size:14px;color:#334155;box-sizing:border-box;outline:none;transition:border 0.15s;font-family:inherit'
      input.value = s[stateKey] || ''
      input.addEventListener('input', function (e) {
        var u = {}; u[stateKey] = e.target.value; s.update(u)
      })
      input.addEventListener('focus', function () { input.style.borderColor = '#4f46e5' })
      input.addEventListener('blur', function () { input.style.borderColor = '#f1f5f9' })
      wrap.appendChild(input)
      return wrap
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

      // small upload area inline
      var preview = document.createElement('div')
      preview.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-top:4px'
      var uploadWrap = document.createElement('div')
      uploadWrap.style.cssText = 'position:relative;border:2px dashed #e2e8f0;border-radius:12px;padding:20px 10px;text-align:center;cursor:pointer;background:white;flex:1'
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

    // Title
    var titleRow = document.createElement('div')
    titleRow.style.cssText = 'display:flex;align-items:center;gap:14px;padding-bottom:20px;border-bottom:1px solid #f1f5f9'
    titleRow.innerHTML = '<div style="padding:10px;background:#fef3c7;border-radius:14px"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#b45309" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>' +
      '<div><h2 style="font-size:22px;font-weight:900;color:#0f172a;margin:0">1. Symbols AI Native</h2><p style="font-size:13px;color:#64748b;margin:4px 0 0;font-weight:500">Testing the direct generation experience.</p></div>'
    node.appendChild(titleRow)

    // Prompt
    var promptSection = el.scope.buildSection('The Exact Prompt Used')
    var textarea = document.createElement('textarea')
    textarea.placeholder = "e.g., 'Create a settings page with a sidebar, toggle switches and a save button'"
    textarea.style.cssText = 'width:100%;height:112px;padding:16px;border-radius:14px;border:2px solid #f1f5f9;font-size:14px;font-weight:500;color:#334155;resize:vertical;font-family:inherit;box-sizing:border-box;outline:none;transition:border 0.15s'
    textarea.value = s.symbolsPrompt || ''
    textarea.addEventListener('input', function (e) { s.update({ symbolsPrompt: e.target.value }) })
    textarea.addEventListener('focus', function () { textarea.style.borderColor = '#4f46e5' })
    textarea.addEventListener('blur', function () { textarea.style.borderColor = '#f1f5f9' })
    promptSection.appendChild(textarea)
    node.appendChild(promptSection)

    // GitHub URL
    var githubSection = el.scope.buildSection('GitHub Repo / Sandbox URL')
    var githubIcon = '<svg style="position:absolute;left:14px;top:14px;color:#94a3b8" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>'
    githubSection.appendChild(el.scope.buildInput(s, 'https://github.com/your-repo', 'symbolsGithub', githubIcon))
    node.appendChild(githubSection)

    // Symbols Live URL
    var urlSection = el.scope.buildSection('Symbols Live Preview URL')
    var linkIcon = '<svg style="position:absolute;left:14px;top:14px;color:#94a3b8" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>'
    urlSection.appendChild(el.scope.buildInput(s, 'https://your-symbols-app.pages.dev', 'symbolsUrl', linkIcon))
    node.appendChild(urlSection)

    // Screenshot upload
    var uploadSection = el.scope.buildSection('Attach Results Screenshots')
    el.scope.buildUploadArea(s, uploadSection, 'symbolsScreenshots', 'Click to upload screenshots')
    node.appendChild(uploadSection)

    // Accuracy options
    var accSection = el.scope.buildSection('Symbols initial accuracy?')
    el.scope.buildOptionButtons(s, accSection, 'symbolsAccuracy', ['Fully correct', 'Mostly correct', 'Partially correct', 'Incorrect'])
    node.appendChild(accSection)

    // Iterations options
    var iterSection = el.scope.buildSection('Manual fixes required?')
    el.scope.buildOptionButtons(s, iterSection, 'symbolsIterations', ['0', '1-2', '3-5', '6+'])
    node.appendChild(iterSection)

    // Comparison checkbox
    var sep = document.createElement('div')
    sep.style.cssText = 'height:1px;background:#f1f5f9;margin:4px 0'
    node.appendChild(sep)

    var checkRow = document.createElement('label')
    checkRow.style.cssText = 'display:flex;align-items:center;gap:14px;padding:20px 24px;background:#f8fafc;border-radius:16px;border:2px solid ' + (s.isComparison ? '#4f46e5' : '#e2e8f0') + ';cursor:pointer;transition:all 0.15s;user-select:none'
    checkRow.setAttribute('data-comparison-row', '1')

    var checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = s.isComparison || false
    checkbox.style.cssText = 'width:20px;height:20px;accent-color:#4f46e5;cursor:pointer;flex-shrink:0'
    checkbox.setAttribute('data-comparison-cb', '1')

    var checkText = document.createElement('div')
    checkText.innerHTML = '<div style="font-size:15px;font-weight:700;color:#0f172a">Compare against another framework</div>' +
      '<div style="font-size:13px;color:#64748b;margin-top:2px">Enable Phase 2 to benchmark Symbols against React, Angular, Vue, etc.</div>'

    checkRow.appendChild(checkbox)
    checkRow.appendChild(checkText)
    node.appendChild(checkRow)

    // Metrics row (only shown when comparison is enabled)
    var metricsWrap = document.createElement('div')
    metricsWrap.setAttribute('data-p1-metrics', '1')
    metricsWrap.style.display = s.isComparison ? 'block' : 'none'
    var metricsSection = el.scope.buildSection('Performance Metrics')
    el.scope.buildMetricsRow(s, metricsSection, 'symbolsMetrics', 'symbolsMetricsScreenshots')
    metricsWrap.appendChild(metricsSection)
    node.appendChild(metricsWrap)

    checkbox.addEventListener('change', function () {
      var enabled = checkbox.checked
      s.update({ isComparison: enabled })
      // Update row border
      checkRow.style.borderColor = enabled ? '#4f46e5' : '#e2e8f0'
      checkRow.style.background = enabled ? '#eef2ff' : '#f8fafc'
      // Show/hide metrics section
      var p1metrics = document.querySelector('[data-p1-metrics]')
      if (p1metrics) p1metrics.style.display = enabled ? 'block' : 'none'
      // Show/hide Phase 2 tab directly
      var phase2tab = document.querySelector('button[data-phase="2"]')
      if (phase2tab) {
        phase2tab.style.opacity = enabled ? '1' : '0.3'
        phase2tab.style.pointerEvents = enabled ? 'auto' : 'none'
      }
      // Directly update Phase 3 DOM (onStateUpdate is unreliable)
      var p3title = document.querySelector('[data-p3-title]')
      if (p3title) p3title.textContent = enabled ? '3. Final Verdict' : '3. Final Notes'
      var p3desc = document.querySelector('[data-p3-desc]')
      if (p3desc) p3desc.textContent = enabled ? 'Data-backed head-to-head comparison.' : 'Your overall experience with Symbols AI.'
      var p3comp = document.querySelector('[data-p3-comparison]')
      if (p3comp) p3comp.style.display = enabled ? 'contents' : 'none'
      var p3reasonLbl = document.querySelector('[data-p3-reason-label]')
      if (p3reasonLbl) p3reasonLbl.textContent = enabled ? 'TECHNICAL REASONING' : 'OVERALL EXPERIENCE & NOTES'
      var p3reasonTa = document.querySelector('[data-p3-reason-ta]')
      if (p3reasonTa) p3reasonTa.placeholder = enabled
        ? 'Explain the specific technical differences, bugs encountered, or productivity boosts...'
        : 'Describe your experience with Symbols AI generation — accuracy, ease of use, notable wins or issues...'
    })
    // Set initial Phase 2 tab state
    requestAnimationFrame(function () {
      var phase2tab = document.querySelector('button[data-phase="2"]')
      if (phase2tab) {
        phase2tab.style.opacity = s.isComparison ? '1' : '0.3'
        phase2tab.style.pointerEvents = s.isComparison ? 'auto' : 'none'
      }
    })
  }
}
