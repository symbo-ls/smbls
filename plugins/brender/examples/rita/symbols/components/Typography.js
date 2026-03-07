// ─── Typography primitives ──────────────────────────────────────────────────

export const Eyebrow = {
  fontFamily: "'DM Mono', monospace",
  fontSize: '11px',
  fontWeight: '400',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'accent',
  marginBottom: '16px',
  display: 'block'
}

export const H2 = {
  tag: 'h2',
  fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
  fontSize: 'clamp(32px, 4.2vw, 56px)',
  fontWeight: '700',
  lineHeight: '1.04',
  letterSpacing: '-0.036em',
  color: 'dark'
}

export const Lead = {
  tag: 'p',
  fontSize: '16px',
  color: 'textSecondary',
  lineHeight: '1.72',
  maxWidth: '500px',
  marginTop: '18px',
  fontWeight: '400'
}
