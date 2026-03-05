import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js'

export const initApp = function initApp (s) {
  fetch(SUPABASE_URL + '/rest/v1/survey_submissions?select=data,created_at&order=created_at.desc', {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + SUPABASE_ANON_KEY
    }
  })
    .then(function (r) { return r.json() })
    .then(function (rows) {
      var subs = Array.isArray(rows)
        ? rows.map(function (row) { return Object.assign({}, row.data, { createdAt: row.created_at }) })
        : []
      s.update({ submissions: subs })
    })
    .catch(function (err) {
      console.error('Failed to load submissions:', err)
      s.update({ submissions: [] })
    })
}
