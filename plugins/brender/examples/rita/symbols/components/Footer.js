// ─── Footer ─────────────────────────────────────────────────────────────────

export const Footer = {
  tag: 'footer',
  background: 'dark',
  padding: '40px 0',

  Inner: {
    extends: 'Flex',
    flexFlow: 'column',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 48px',
    gap: '20px',
    '@tablet': { padding: '0 24px' },

    Links: {
      extends: 'Flex',
      gap: '24px',
      style: { flexWrap: 'wrap' },
      justifyContent: 'center',
      width: '100%',
      '@mobile': { flexDirection: 'column', gap: '0', alignItems: 'stretch' },

      childExtends: 'FooterLink',

      AboutL: { href: '/about', text: 'About' },
      CoachingL: { href: '/from-workshops-to-1-on-1s', text: 'Coaching' },
      FreelanceL: { href: '/hire-me-as-a-freelancer', text: 'Freelance' },
      AngelL: { href: '/angel-investment', text: 'Angel' },
      ReferencesL: { href: '/references-and-partners', text: 'References' },
      LinkedInL: { tag: 'a', attr: { href: 'https://www.linkedin.com/in/rita-kato-growth/', target: '_blank', rel: 'noopener' }, whiteSpace: 'nowrap', text: 'LinkedIn\u00a0\u2197', '@mobile': { borderBottomWidth: '0' } }
    },

    Copyright: {
      width: '100%',
      fontSize: '11px',
      fontFamily: "'DM Mono', monospace",
      color: 'cream35',
      paddingTop: '20px',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: 'cream15',
      textAlign: 'center',
      letterSpacing: '0.02em',
      text: '\u00a9 2024 Rita Katona. All rights reserved.'
    }
  }
}

export const FooterLink = {
  extends: 'Link',
  fontSize: '12px',
  color: 'cream65',
  transition: 'color 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { color: 'cream92' },
  '@mobile': {
    display: 'block',
    padding: '14px 0',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'cream15'
  }
}
