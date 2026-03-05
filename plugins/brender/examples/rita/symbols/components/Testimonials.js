// ─── Testimonial Card ───────────────────────────────────────────────────────

export const TestimonialCard = {
  background: 'white',
  padding: '32px',
  transition: 'background 200ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { background: 'bgSubtle' },

  Stars: {
    color: 'textTertiary',
    fontSize: '9px',
    marginBottom: '16px',
    letterSpacing: '4px',
    text: '\u2605\u2605\u2605\u2605\u2605'
  },
  Quote: {
    tag: 'p',
    fontSize: '13px',
    color: 'textSecondary',
    lineHeight: '1.80',
    fontStyle: 'italic',
    marginBottom: '24px',
    fontWeight: '300'
  },
  AuthorName: {
    fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '-0.01em',
    color: 'dark'
  },
  AuthorRole: {
    fontSize: '11px',
    color: 'textTertiary',
    marginTop: '3px',
    letterSpacing: '0.02em'
  }
}

// ─── Testimonials Preview (home page section) ───────────────────────────────

export const TestimonialsPreview = {
  tag: 'section',
  id: 'testimonials',
  background: 'bgSubtle',
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
        text: 'Kind words'
      },
      Title: {
        tag: 'h2',
        extends: 'H2',
        text: 'What people say'
      }
    },

    Grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1px',
      background: 'borderLight',
      '@tablet': { gridTemplateColumns: '1fr 1fr' },
      '@mobile': { gridTemplateColumns: '1fr' }
    },

    ViewAll: {
      textAlign: 'center',
      marginTop: '40px',

      Link: {
        extends: 'CardLink',
        tag: 'a',
        attr: { href: '/references-and-partners' },
        text: 'View all references \u2192'
      }
    }
  }
}
