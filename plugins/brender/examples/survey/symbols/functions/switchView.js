export const switchView = function switchView (s, view) {
  s.update({ view: view })
  var views = ['survey', 'dashboard', 'success']
  views.forEach(function (v) {
    var el = document.getElementById('view-' + v)
    if (el) el.style.display = v === view ? 'block' : 'none'
  })
  // Deactivate phase tabs when leaving survey view
  document.querySelectorAll('button[data-phase]').forEach(function (btn) {
    var isActive = view === 'survey' && parseInt(btn.getAttribute('data-phase')) === s.phase
    btn.style.background = isActive ? '#4f46e5' : 'transparent'
    btn.style.color = isActive ? 'white' : '#64748b'
    btn.style.boxShadow = isActive ? '0 1px 4px rgba(79,70,229,0.3)' : ''
  })
  // Update Results button
  var resultsBtn = document.querySelector('[data-results-btn]')
  if (resultsBtn) {
    resultsBtn.style.background = view === 'dashboard' ? '#4f46e5' : 'transparent'
    resultsBtn.style.color = view === 'dashboard' ? 'white' : '#4f46e5'
  }
}
