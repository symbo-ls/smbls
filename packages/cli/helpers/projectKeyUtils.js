export function normalizeProjectKey (raw) {
  const s = String(raw || '').trim()
  if (!s) return ''

  // If user pasted a full key like foo.symbo.ls, keep it.
  if (/\.symbo\.ls$/iu.test(s)) return s

  // If it looks like a hostname already, leave it alone.
  if (s.includes('.')) return s

  return `${s}.symbo.ls`
}

export function suggestProjectKeyFromName (name) {
  const s = String(name || '').trim().toLowerCase()
  if (!s) return ''

  const slug = s
    .replace(/[^a-z0-9]+/giu, '-')
    .replace(/^-+/u, '')
    .replace(/-+$/u, '')
    .replace(/-{2,}/gu, '-')

  if (!slug) return ''
  return normalizeProjectKey(slug)
}

export function isProbablyProjectId (value) {
  return /^[0-9a-f]{24}$/iu.test(String(value || '').trim())
}
