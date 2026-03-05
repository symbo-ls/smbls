// ─── Button primitives ──────────────────────────────────────────────────────

export const Btn = {
  extends: 'Flex',
  tag: 'button',
  display: 'inline-flex',
  flexAlign: 'center center',
  gap: '6px',
  fontSize: '13px',
  fontWeight: '500',
  padding: '10px 22px',
  borderRadius: '2px',
  borderWidth: '0',
  borderStyle: 'solid',
  borderColor: 'transparent',
  cursor: 'pointer',
  letterSpacing: '-0.005em',
  transition: 'background 140ms cubic-bezier(0.0, 0.0, 0.2, 1), color 140ms cubic-bezier(0.0, 0.0, 0.2, 1), border-color 140ms cubic-bezier(0.0, 0.0, 0.2, 1), opacity 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':active': { opacity: '0.7' }
}

export const BtnPrimary = {
  extends: 'Btn',
  background: 'dark',
  color: 'white',
  ':hover': { background: 'dark2' }
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
  borderRadius: '2px',
  ':hover': { background: 'dark', color: 'white' }
}
