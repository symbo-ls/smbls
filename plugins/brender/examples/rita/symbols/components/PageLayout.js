// ─── Page Layout ────────────────────────────────────────────────────────────

export const PageLayout = {
  extends: 'Flex',
  flexFlow: 'column',
  minHeight: '100vh',
  background: 'white',
  animation: 'pageEnter 520ms cubic-bezier(0.16, 1, 0.3, 1) both'
}

// ─── Page Header (dark banner for sub-pages) ────────────────────────────────

export const PageHeader = {
  tag: 'section',
  padding: '144px 32px 80px',
  position: 'relative',
  overflow: 'hidden',
  '@tablet': { padding: '116px 20px 60px' },

  Bg: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'dark'
  },

  Inner: {
    position: 'relative',
    zIndex: '1',
    maxWidth: '680px',
    margin: '0 auto',
    textAlign: 'center'
  }
}

// ─── Back Link ──────────────────────────────────────────────────────────────

export const BackLink = {
  tag: 'a',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  fontSize: '11px',
  color: 'white20',
  marginBottom: '32px',
  letterSpacing: '0.06em',
  transition: 'color 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { color: 'darkWhite48' }
}

// ─── Section wrappers ───────────────────────────────────────────────────────

export const Section = {
  tag: 'section',
  background: 'white',
  padding: '96px 0'
}

export const SectionAlt = {
  tag: 'section',
  background: 'bgSubtle',
  padding: '96px 0'
}

export const SectionDark = {
  tag: 'section',
  background: 'dark',
  padding: '96px 0'
}

// ─── Inner container ────────────────────────────────────────────────────────

export const Inner = {
  maxWidth: '1120px',
  margin: '0 auto',
  padding: '0 32px',
  '@tablet': { padding: '0 20px' }
}

// ─── Section Header ─────────────────────────────────────────────────────────

export const SectionHeader = {
  marginBottom: '72px'
}

// ─── Chips ──────────────────────────────────────────────────────────────────

export const Chip = {
  padding: '5px 12px',
  background: 'transparent',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'borderMedium',
  borderRadius: '2px',
  fontSize: '11px',
  color: 'textSecondary',
  transition: 'border-color 140ms cubic-bezier(0.0, 0.0, 0.2, 1), color 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { borderColor: 'borderStrong', color: 'dark' }
}
