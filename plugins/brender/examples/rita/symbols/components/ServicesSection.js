// ─── Services Section (dark) ────────────────────────────────────────────────

export const ServicesSection = {
  tag: 'section',
  id: 'services',
  background: 'dark',
  padding: '104px 0',
  '@tablet': { padding: '80px 0' },
  '@mobile': { padding: '60px 0' },

  Inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 48px',
    '@tablet': { padding: '0 24px' },

    Header: {
      marginBottom: '72px',

      Eyebrow: {
        extends: 'Eyebrow',
        color: 'cream48',
        text: 'Services'
      },
      Title: {
        tag: 'h2',
        extends: 'H2',
        color: 'cream92',
        text: 'How I can help you grow'
      },
      Lead: {
        extends: 'Lead',
        color: 'cream65',
        fontWeight: '400',
        text: 'From coaching and workshops to hands-on freelance support and angel investment.'
      }
    },

    Grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1px',
      background: 'cream12',
      borderRadius: '12px',
      overflow: 'hidden',
      counterReset: 'service-card',
      '@tablet': { gridTemplateColumns: '1fr' }
    }
  }
}

// ─── Dark Service Card (for services grid) ──────────────────────────────────

export const DarkServiceCard = {
  tag: 'article',
  background: 'darkCard',
  padding: '48px',
  position: 'relative',
  transition: 'background 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  ':hover': { background: 'dark2', transform: 'translateY(-4px)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },

  ':before': {
    counterIncrement: 'service-card',
    content: '"0" counter(service-card)',
    display: 'block',
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    fontWeight: '400',
    letterSpacing: '0.06em',
    color: 'accent',
    opacity: '0.6',
    marginBottom: '40px'
  },

  Icon: {
    marginBottom: '16px',
    fontSize: '16px',
    opacity: '0.5'
  },
  Title: {
    tag: 'h3',
    color: 'cream92',
    fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
    fontSize: '17px',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    marginBottom: '10px'
  },
  Text: {
    tag: 'p',
    color: 'cream48',
    fontSize: '14px',
    lineHeight: '1.72',
    fontWeight: '400'
  },
  Link: {
    extends: 'Link',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    fontWeight: '500',
    fontFamily: "'DM Mono', monospace",
    color: 'darkWhite68',
    marginTop: '24px',
    transition: 'color 160ms cubic-bezier(0.0, 0.0, 0.2, 1), gap 160ms cubic-bezier(0.0, 0.0, 0.2, 1)',
    ':hover': { color: 'darkWhite84', gap: '9px' }
  }
}
