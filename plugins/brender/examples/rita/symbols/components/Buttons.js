// ─── Button primitives ──────────────────────────────────────────────────────

export const Btn = {
  extends: 'Flex',
  tag: 'button',
  display: 'inline-flex',
  flexAlign: 'center center',
  gap: '6px',
  fontSize: '13px',
  fontWeight: '500',
  padding: '11px 24px',
  borderRadius: '6px',
  borderWidth: '0',
  borderStyle: 'solid',
  borderColor: 'transparent',
  cursor: 'pointer',
  letterSpacing: '-0.005em',
  transition: 'background 180ms cubic-bezier(0.16, 1, 0.3, 1), color 180ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms cubic-bezier(0.16, 1, 0.3, 1), transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
  ':active': { transform: 'scale(0.97)' }
}

export const BtnPrimary = {
  extends: 'Btn',
  background: 'dark',
  color: 'cream',
  ':hover': { background: 'dark3' }
}

export const BtnAccent = {
  extends: 'Btn',
  background: 'accent',
  color: 'white',
  ':hover': { background: 'accentHover' }
}

export const BtnGhost = {
  extends: 'Btn',
  background: 'transparent',
  color: 'textSecondary',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'borderStrong',
  ':hover': { background: 'bgSubtle', color: 'dark', borderColor: 'borderMedium' }
}

export const BtnOutline = {
  extends: 'Btn',
  background: 'transparent',
  color: 'dark',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'borderStrong',
  borderRadius: '6px',
  ':hover': { background: 'dark', color: 'cream' }
}
