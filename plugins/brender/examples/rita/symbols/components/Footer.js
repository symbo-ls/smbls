// ─── Footer ─────────────────────────────────────────────────────────────────

export const Footer = {
  tag: 'footer',
  background: 'dark',
  padding: '36px 0',

  Inner: {
    extends: 'Flex',
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '0 32px',
    flexAlign: 'center space-between',
    flexWrap: 'wrap',
    gap: '16px',

    Brand: {
      fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
      fontSize: '13px',
      fontWeight: '600',
      letterSpacing: '-0.02em',
      color: 'white32'
    },

    Links: {
      extends: 'Flex',
      gap: '24px',

      childExtends: 'FooterLink',

      AboutL: { tag: 'a', attr: { href: '/about' }, text: 'About' },
      CoachingL: { tag: 'a', attr: { href: '/from-workshops-to-1-on-1s' }, text: 'Coaching' },
      FreelanceL: { tag: 'a', attr: { href: '/hire-me-as-a-freelancer' }, text: 'Freelance' },
      AngelL: { tag: 'a', attr: { href: '/angel-investment' }, text: 'Angel' },
      LinkedInL: { tag: 'a', attr: { href: 'https://linkedin.com/in/rita-katona-growth/', target: '_blank', rel: 'noopener' }, text: 'LinkedIn \u2197' }
    },

    Copyright: {
      width: '100%',
      fontSize: '11px',
      color: 'white08',
      paddingTop: '20px',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: 'white05',
      marginTop: '12px',
      textAlign: 'center',
      letterSpacing: '0.04em',
      text: '\u00a9 2024 Rita Katona. All rights reserved.'
    }
  }
}

export const FooterLink = {
  tag: 'a',
  fontSize: '12px',
  color: 'white20',
  transition: 'color 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':hover': { color: 'darkWhite48' }
}
