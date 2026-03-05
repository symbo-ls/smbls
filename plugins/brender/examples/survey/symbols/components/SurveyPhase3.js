export const SurveyPhase3 = {
  extends: 'Flex',
  flow: 'y',
  gap: 'B2',

  scope: {
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

    buildRatingButtons: function (s, node, fieldName, minLabel, maxLabel) {
      var btnRow = document.createElement('div')
      btnRow.style.cssText = 'display:flex;gap:4px'
      for (var i = 1; i <= 10; i++) {
        var btn = document.createElement('button')
        btn.type = 'button'
        btn.textContent = i
        btn.setAttribute('data-rfield', fieldName)
        btn.setAttribute('data-rval', i)
        var isActive = s[fieldName] === i
        btn.style.cssText = 'flex:1;padding:10px 2px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;border:2px solid;transition:all 0.15s;' +
          (isActive ? 'background:#4f46e5;border-color:#4f46e5;color:white;box-shadow:0 1px 3px rgba(79,70,229,0.3)' : 'background:white;border-color:#e2e8f0;color:#64748b')
        ;(function (val, b) {
          b.addEventListener('click', function () {
            btnRow.querySelectorAll('button').forEach(function (rb) {
              var a = parseInt(rb.getAttribute('data-rval')) === val
              rb.style.background = a ? '#4f46e5' : 'white'
              rb.style.borderColor = a ? '#4f46e5' : '#e2e8f0'
              rb.style.color = a ? 'white' : '#64748b'
              rb.style.boxShadow = a ? '0 1px 3px rgba(79,70,229,0.3)' : ''
            })
            var u = {}; u[fieldName] = val; s.update(u)
          })
        })(i, btn)
        btnRow.appendChild(btn)
      }
      node.appendChild(btnRow)
      var footer = document.createElement('div')
      footer.style.cssText = 'display:flex;justify-content:space-between;margin-top:4px'
      footer.innerHTML = '<span style="font-size:10px;color:#94a3b8;font-weight:700;text-transform:uppercase">' + (minLabel || 'Lower') + '</span>' +
        '<span style="font-size:10px;color:#94a3b8;font-weight:700;text-transform:uppercase">' + (maxLabel || 'Higher') + '</span>'
      node.appendChild(footer)
    },

    // Sync Phase 3 UI to current isComparison state — called from checkbox + onStateUpdate
    syncComparison: function (el, s) {
      var node = el.node
      // Title
      var h2 = node.querySelector('[data-p3-title]')
      var desc = node.querySelector('[data-p3-desc]')
      if (h2) h2.textContent = s.isComparison ? '3. Final Verdict' : '3. Final Notes'
      if (desc) desc.textContent = s.isComparison ? 'Data-backed head-to-head comparison.' : 'Your overall experience with Symbols AI.'
      // Comparison-only block
      var compBlock = node.querySelector('[data-p3-comparison]')
      if (compBlock) compBlock.style.display = s.isComparison ? 'contents' : 'none'
      // Preference label update
      if (s.isComparison && s.comparisonFramework) {
        var fwMap = { react: 'React', angular: 'Angular', vue: 'Vue', svelte: 'Svelte', html: 'HTML + CSS', other: s.comparisonFrameworkCustom || 'Other' }
        var fwName = fwMap[s.comparisonFramework] || 'Other Framework'
        var prefLbl = node.querySelector('[data-p3-pref-label]')
        if (prefLbl) prefLbl.textContent = 'WHICH EXPERIENCE DO YOU PREFER?'
        var ratingLbl = node.querySelector('[data-p3-rating-label]')
        if (ratingLbl) ratingLbl.textContent = 'SYMBOLS AI ADVANTAGE OVER ' + fwName.toUpperCase() + ' (1-10)'
        // Update preference button labels
        var prefBtns = node.querySelectorAll('[data-p3-pref-btn]')
        if (prefBtns[1]) prefBtns[1].textContent = fwName
      }
      // Reason label/placeholder
      var reasonLbl = node.querySelector('[data-p3-reason-label]')
      var reasonTA = node.querySelector('[data-p3-reason-ta]')
      if (reasonLbl) reasonLbl.textContent = s.isComparison ? 'TECHNICAL REASONING' : 'OVERALL EXPERIENCE & NOTES'
      if (reasonTA) reasonTA.placeholder = s.isComparison
        ? 'Explain the specific technical differences, bugs encountered, or productivity boosts...'
        : 'Describe your experience with Symbols AI generation — accuracy, ease of use, notable wins or issues...'
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
    titleRow.innerHTML = '<div style="padding:10px;background:#d1fae5;border-radius:14px"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#047857" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>' +
      '<div><h2 data-p3-title style="font-size:22px;font-weight:900;color:#0f172a;margin:0">3. Final Notes</h2>' +
      '<p data-p3-desc style="font-size:13px;color:#64748b;margin:4px 0 0;font-weight:500">Your overall experience with Symbols AI.</p></div>'
    node.appendChild(titleRow)

    // Comparison-only block (preference + rating) — toggled via display
    var compBlock = document.createElement('div')
    compBlock.setAttribute('data-p3-comparison', '1')
    compBlock.style.cssText = 'display:' + (s.isComparison ? 'contents' : 'none')

    // Preference section
    var prefSection = document.createElement('div')
    prefSection.style.cssText = 'display:flex;flex-direction:column;gap:12px'
    var prefLbl = document.createElement('label')
    prefLbl.setAttribute('data-p3-pref-label', '1')
    prefLbl.textContent = 'WHICH EXPERIENCE DO YOU PREFER?'
    prefLbl.style.cssText = 'font-size:12px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.05em'
    prefSection.appendChild(prefLbl)

    var prefGrid = document.createElement('div')
    prefGrid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px'
    var fwMap = { react: 'React', angular: 'Angular', vue: 'Vue', svelte: 'Svelte', html: 'HTML + CSS', other: s.comparisonFrameworkCustom || 'Other' }
    var fwName = s.comparisonFramework ? (fwMap[s.comparisonFramework] || 'Other Framework') : 'Other Framework'
    ;['Symbols AI', fwName].forEach(function (opt, idx) {
      var btn = document.createElement('button')
      btn.type = 'button'
      btn.textContent = opt
      btn.setAttribute('data-p3-pref-btn', idx)
      btn.setAttribute('data-field', 'preference')
      btn.setAttribute('data-val', opt)
      var isActive = s.preference === opt
      btn.style.cssText = 'padding:10px 12px;border-radius:12px;font-size:13px;font-weight:600;cursor:pointer;text-align:left;transition:all 0.15s;' +
        (isActive ? 'background:#eef2ff;border:2px solid #4f46e5;color:#4f46e5' : 'background:white;border:2px solid #e2e8f0;color:#475569')
      btn.addEventListener('click', function () {
        prefGrid.querySelectorAll('button').forEach(function (b) {
          var a = b === btn
          b.style.background = a ? '#eef2ff' : 'white'
          b.style.borderColor = a ? '#4f46e5' : '#e2e8f0'
          b.style.color = a ? '#4f46e5' : '#475569'
        })
        s.update({ preference: opt })
      })
      prefGrid.appendChild(btn)
    })
    prefSection.appendChild(prefGrid)
    compBlock.appendChild(prefSection)

    // Rating section
    var ratingSection = document.createElement('div')
    ratingSection.style.cssText = 'display:flex;flex-direction:column;gap:12px'
    var ratingLbl = document.createElement('label')
    ratingLbl.setAttribute('data-p3-rating-label', '1')
    ratingLbl.textContent = 'SYMBOLS AI ADVANTAGE OVER ' + fwName.toUpperCase() + ' (1-10)'
    ratingLbl.style.cssText = 'font-size:12px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.05em'
    ratingSection.appendChild(ratingLbl)
    el.scope.buildRatingButtons(s, ratingSection, 'comparisonScore', 'No advantage', 'Clear winner')
    compBlock.appendChild(ratingSection)

    node.appendChild(compBlock)

    // Reasoning (always shown)
    var reasonSection = document.createElement('div')
    reasonSection.style.cssText = 'display:flex;flex-direction:column;gap:12px'
    var reasonLbl = document.createElement('label')
    reasonLbl.setAttribute('data-p3-reason-label', '1')
    reasonLbl.textContent = s.isComparison ? 'TECHNICAL REASONING' : 'OVERALL EXPERIENCE & NOTES'
    reasonLbl.style.cssText = 'font-size:12px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.05em'
    var reasonTextarea = document.createElement('textarea')
    reasonTextarea.setAttribute('data-p3-reason-ta', '1')
    reasonTextarea.placeholder = s.isComparison
      ? 'Explain the specific technical differences, bugs encountered, or productivity boosts...'
      : 'Describe your experience with Symbols AI generation — accuracy, ease of use, notable wins or issues...'
    reasonTextarea.style.cssText = 'width:100%;height:160px;padding:16px;border-radius:14px;border:2px solid #f1f5f9;font-size:14px;font-weight:500;color:#334155;resize:vertical;font-family:inherit;box-sizing:border-box;outline:none;transition:border 0.15s'
    reasonTextarea.value = s.comparisonReason || ''
    reasonTextarea.addEventListener('input', function (e) { s.update({ comparisonReason: e.target.value }) })
    reasonTextarea.addEventListener('focus', function () { reasonTextarea.style.borderColor = '#4f46e5' })
    reasonTextarea.addEventListener('blur', function () { reasonTextarea.style.borderColor = '#f1f5f9' })
    reasonSection.appendChild(reasonLbl)
    reasonSection.appendChild(reasonTextarea)
    node.appendChild(reasonSection)
  },

  onStateUpdate: (el, s) => {
    el.scope.syncComparison(el, s)
  }
}
