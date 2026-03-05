// ─── Services Section (dark) ────────────────────────────────────────────────

export const ServicesSection = {
  tag: 'section',
  id: 'services',
  background: 'dark',
  padding: '96px 0',

  Inner: {
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '0 32px',
    '@tablet': { padding: '0 20px' },

    Header: {
      marginBottom: '72px',

      Eyebrow: {
        extends: 'Eyebrow',
        color: 'white22',
        text: 'Services'
      },
      Title: {
        tag: 'h2',
        extends: 'H2',
        color: 'white',
        text: 'How I can help you grow'
      },
      Lead: {
        extends: 'Lead',
        color: 'darkWhite30',
        fontWeight: '300',
        text: 'From coaching and workshops to hands-on freelance support and angel investment.'
      }
    },

    Grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1px',
      background: 'white05',
      counterReset: 'service-card',
      '@tablet': { gridTemplateColumns: '1fr' }
    }
  }
}

// ─── Dark Service Card (for services grid) ──────────────────────────────────

export const DarkServiceCard = {
  tag: 'article',
  background: 'darkCard',
  padding: '44px',
  position: 'relative',
  transition: 'background 200ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { background: 'dark2' },

  ':before': {
    counterIncrement: 'service-card',
    content: '"0" counter(service-card)',
    display: 'block',
    fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
    fontSize: '10px',
    fontWeight: '500',
    letterSpacing: '0.12em',
    color: 'white14',
    marginBottom: '40px'
  },

  Icon: {
    marginBottom: '16px',
    fontSize: '16px',
    opacity: '0.5'
  },
  Title: {
    tag: 'h3',
    color: 'darkWhite84',
    fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
    fontSize: '17px',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    marginBottom: '10px'
  },
  Text: {
    tag: 'p',
    color: 'darkWhite30',
    fontSize: '14px',
    lineHeight: '1.72',
    fontWeight: '300'
  },
  Link: {
    extends: 'DarkCardLink'
  }
}
