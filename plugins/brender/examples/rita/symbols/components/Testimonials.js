// ─── Testimonial Card ───────────────────────────────────────────────────────

export const TestimonialCard = {
  background: 'warmWhite',
  padding: '36px',
  transition: 'background 300ms cubic-bezier(0.16, 1, 0.3, 1)',
  ':hover': { background: 'bgSubtle' },

  Stars: {
    color: 'accent',
    fontSize: '9px',
    marginBottom: '16px',
    letterSpacing: '4px',
    opacity: '0.6',
    text: '\u2605\u2605\u2605\u2605\u2605'
  },
  Quote: {
    tag: 'p',
    fontSize: '13px',
    color: 'textSecondary',
    lineHeight: '1.80',
    fontStyle: 'italic',
    marginBottom: '24px',
    fontWeight: '400'
  },
  Photo: {
    tag: 'img',
    display: 'none',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '12px'
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
    fontFamily: "'DM Mono', monospace",
    color: 'textTertiary',
    marginTop: '4px',
    letterSpacing: '0.01em'
  }
}

// ─── Testimonials Preview (home page section) ───────────────────────────────

export const TestimonialsPreview = {
  tag: 'section',
  id: 'testimonials',
  background: 'cream',
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
      '@mobile': { marginBottom: '48px' },

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
      borderRadius: '12px',
      overflow: 'hidden',
      '@tablet': { gridTemplateColumns: '1fr 1fr' },
      '@mobile': { gridTemplateColumns: '1fr' }
    },

    ViewAll: {
      textAlign: 'center',
      marginTop: '40px',

      Link: {
        extends: 'CardLink',
        href: '/references-and-partners',
        text: 'View all references \u2192'
      }
    }
  }
}
