import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js'

export const submitForm = function submitForm (s) {
  if (s.isSaving) return

  if (!s.symbolsPrompt || s.symbolsPrompt.trim() === '') {
    alert('Please fill in the prompt field in Phase 1')
    return
  }
  if (!s.comparisonReason || s.comparisonReason.trim() === '') {
    alert('Please fill in the notes/reasoning field in Phase 3')
    return
  }

  s.update({ isSaving: true })

  var framework = s.comparisonFramework
    ? (s.comparisonFramework === 'other' ? (s.comparisonFrameworkCustom || 'Other') : s.comparisonFramework)
    : ''

  var submission = {
    // Phase 1
    symbolsPrompt: s.symbolsPrompt || '',
    symbolsGithub: s.symbolsGithub || '',
    symbolsUrl: s.symbolsUrl || '',
    symbolsAccuracy: s.symbolsAccuracy || '',
    symbolsIterations: s.symbolsIterations || '',
    symbolsMetrics: s.symbolsMetrics || '',
    // Comparison
    isComparison: s.isComparison || false,
    comparisonFramework: framework,
    // Phase 2 (only relevant when isComparison)
    comparisonGithub: s.comparisonGithub || '',
    comparisonAccuracy: s.comparisonAccuracy || '',
    comparisonIterations: s.comparisonIterations || '',
    comparisonMetrics: s.comparisonMetrics || '',
    // Phase 3
    preference: s.preference || '',
    comparisonScore: s.comparisonScore || 5,
    comparisonReason: s.comparisonReason || '',
    // Meta
    userId: 'user_' + Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toLocaleString()
  }

  fetch(SUPABASE_URL + '/rest/v1/survey_submissions', {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({ data: submission })
  })
    .then(function (r) {
      if (!r.ok) throw new Error('Save failed: ' + r.status)
      var newSubs = [submission].concat(s.submissions || [])
      s.update({
        isSaving: false,
        isSubmitted: true,
        submissions: newSubs,
        symbolsPrompt: '', symbolsGithub: '', symbolsUrl: '',
        symbolsAccuracy: '', symbolsIterations: '', symbolsMetrics: '',
        isComparison: false, comparisonFramework: '', comparisonFrameworkCustom: '',
        comparisonGithub: '', comparisonAccuracy: '', comparisonIterations: '', comparisonMetrics: '',
        preference: '', comparisonScore: 5, comparisonReason: ''
      })
      var views = ['survey', 'dashboard', 'success']
      views.forEach(function (v) {
        var el = document.getElementById('view-' + v)
        if (el) el.style.display = v === 'success' ? 'block' : 'none'
      })
    })
    .catch(function (err) {
      console.error('Submit failed:', err)
      alert('Failed to save submission. Check your Supabase config in smbls/functions/config.js')
      s.update({ isSaving: false })
    })
}
