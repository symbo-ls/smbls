export default {
  view: 'survey',
  phase: 1,
  isSubmitted: false,
  isSaving: false,
  showShareModal: false,

  // Phase 1 - Symbols
  symbolsPrompt: '',
  symbolsGithub: '',
  symbolsUrl: '',
  symbolsAccuracy: '',
  symbolsIterations: '',
  symbolsScreenshots: [],
  symbolsMetrics: '',
  symbolsMetricsScreenshots: [],

  // Comparison mode
  isComparison: false,
  comparisonFramework: '',
  comparisonFrameworkCustom: '',

  // Phase 2 - Other framework (only when isComparison)
  comparisonGithub: '',
  comparisonAccuracy: '',
  comparisonIterations: '',
  comparisonScreenshots: [],
  comparisonMetrics: '',
  comparisonMetricsScreenshots: [],

  // Phase 3 - Verdict
  preference: '',
  comparisonScore: 5,
  comparisonReason: '',

  // Dashboard
  submissions: []
}
