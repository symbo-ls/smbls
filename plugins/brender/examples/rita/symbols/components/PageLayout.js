// ─── Page Layout ────────────────────────────────────────────────────────────

export const PageLayout = {
  extends: 'Flex',
  flexFlow: 'column',
  minHeight: '100vh',
  background: 'cream'
}

// ─── Page Header (dark banner for sub-pages) ────────────────────────────────

export const PageHeader = {
  tag: 'section',
  padding: '148px 0 88px',
  position: 'relative',
  overflow: 'hidden',
  '@tablet': { padding: '120px 0 64px' },

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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 48px',
    textAlign: 'center',
    '@tablet': { padding: '0 24px' }
  }
}

export const PageHeaderBack = {
  position: 'absolute',
  top: '76px',
  left: '0',
  right: '0',
  zIndex: '2',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 48px',
  '@tablet': { padding: '0 24px', top: '68px' }
}

// ─── Centered text wrapper for PageHeader ────────────────────────────────────

export const PageHeaderCenter = {
  maxWidth: '700px',
  margin: '0 auto'
}

// ─── Back Link ──────────────────────────────────────────────────────────────

export const BackLink = {
  extends: 'Link',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  fontSize: '11px',
  fontFamily: "'DM Mono', monospace",
  color: 'cream48',
  letterSpacing: '0.04em',
  transition: 'color 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { color: 'cream80' }
}

// ─── Section wrappers ───────────────────────────────────────────────────────

export const Section = {
  tag: 'section',
  background: 'warmWhite',
  padding: '104px 0',
  '@tablet': { padding: '80px 0' },
  '@mobile': { padding: '60px 0' }
}

export const SectionAlt = {
  tag: 'section',
  background: 'cream',
  padding: '104px 0',
  '@tablet': { padding: '80px 0' },
  '@mobile': { padding: '60px 0' }
}

export const SectionDark = {
  tag: 'section',
  background: 'dark',
  padding: '104px 0',
  '@tablet': { padding: '80px 0' },
  '@mobile': { padding: '60px 0' }
}

// ─── Inner container ────────────────────────────────────────────────────────

export const Inner = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 48px',
  '@tablet': { padding: '0 24px' }
}

// ─── Section Header ─────────────────────────────────────────────────────────

export const SectionHeader = {
  marginBottom: '72px',
  '@mobile': { marginBottom: '48px' }
}

// ─── Chips ──────────────────────────────────────────────────────────────────

export const Chip = {
  padding: '6px 14px',
  background: 'transparent',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'borderMedium',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: '500',
  color: 'textSecondary',
  whiteSpace: 'nowrap',
  transition: 'border-color 140ms cubic-bezier(0.0, 0.0, 0.2, 1), color 140ms cubic-bezier(0.0, 0.0, 0.2, 1), background 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { borderColor: 'borderStrong', color: 'dark', background: 'accentLight' }
}

// ─── Partner Chip (with logo) ────────────────────────────────────────────────

export const PartnerChip = {
  extends: 'Flex',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '7px 13px',
  whiteSpace: 'nowrap',
  background: 'transparent',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'borderMedium',
  borderRadius: '8px',
  transition: 'border-color 140ms cubic-bezier(0.0, 0.0, 0.2, 1), background 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { borderColor: 'borderStrong', background: 'bgSubtle' },

  Logo: {
    tag: 'img',
    width: '24px',
    height: '24px',
    objectFit: 'contain',
    flexShrink: '0',
    borderRadius: '4px'
  },
  Name: {
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '-0.01em',
    color: 'dark'
  }
}
