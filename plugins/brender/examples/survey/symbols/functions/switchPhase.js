export const switchPhase = function switchPhase (s, phase) {
  // Skip phase 2 if comparison is disabled
  if (phase === 2 && !s.isComparison) {
    phase = s.phase < 2 ? 3 : 1
  }

  s.update({ phase: phase })

  // Always switch view back to survey (fixes: clicking phase tab from Results)
  var views = ['survey', 'dashboard', 'success']
  views.forEach(function (v) {
    var vel = document.getElementById('view-' + v)
    if (vel) vel.style.display = v === 'survey' ? 'block' : 'none'
  })

  // Show/hide phase panels
  ;[1, 2, 3].forEach(function (p) {
    var el = document.getElementById('phase-' + p)
    if (el) el.style.display = p === phase ? 'block' : 'none'
  })

  // Update phase tab buttons
  document.querySelectorAll('button[data-phase]').forEach(function (btn) {
    var p = parseInt(btn.getAttribute('data-phase'))
    btn.style.background = p === phase ? '#4f46e5' : 'transparent'
    btn.style.color = p === phase ? 'white' : '#64748b'
    btn.style.boxShadow = p === phase ? '0 1px 4px rgba(79,70,229,0.3)' : ''
  })

  // Update next button text
  var nextBtn = document.querySelector('[data-next-btn]')
  if (nextBtn) {
    nextBtn.textContent = phase < 3 ? 'Continue \u2192' : 'Submit Final Report'
    nextBtn.style.background = phase < 3 ? '#4f46e5' : '#059669'
  }

  // Update prev button
  var prevBtn = document.querySelector('[data-prev-btn]')
  if (prevBtn) {
    prevBtn.style.opacity = phase === 1 ? '0' : '1'
    prevBtn.style.pointerEvents = phase === 1 ? 'none' : 'auto'
  }
}
