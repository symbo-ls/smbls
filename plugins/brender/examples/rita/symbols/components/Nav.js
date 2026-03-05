// ─── Nav ────────────────────────────────────────────────────────────────────

export const Nav = {
  extends: 'Flex',
  tag: 'nav',
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: '1000',
  height: '52px',
  background: 'navBg',
  style: { backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' },
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'borderLight',
  transition: 'border-color 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',

  Inner: {
    extends: 'Flex',
    maxWidth: '1120px',
    margin: '0 auto',
    height: '100%',
    flexAlign: 'center space-between',
    padding: '0 32px',
    width: '100%',

    Logo: {
      extends: 'Link',
      href: '/',
      fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
      fontSize: '14px',
      fontWeight: '600',
      letterSpacing: '-0.02em',
      color: 'dark',
      transition: 'opacity 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
      ':hover': { opacity: '0.4' },
      text: 'Rita Katona'
    },

    Links: {
      extends: 'Flex',
      flexAlign: 'center center',
      gap: '28px',

      About: {
        extends: 'Link',
        href: '/about',
        fontSize: '13px',
        fontWeight: '400',
        color: 'textTertiary',
        transition: 'color 120ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { color: 'dark' },
        text: 'About',
        '@mobile': { display: 'none' }
      },
      Coaching: {
        extends: 'Link',
        href: '/from-workshops-to-1-on-1s',
        fontSize: '13px',
        fontWeight: '400',
        color: 'textTertiary',
        transition: 'color 120ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { color: 'dark' },
        text: 'Coaching',
        '@mobile': { display: 'none' }
      },
      Freelance: {
        extends: 'Link',
        href: '/hire-me-as-a-freelancer',
        fontSize: '13px',
        fontWeight: '400',
        color: 'textTertiary',
        transition: 'color 120ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { color: 'dark' },
        text: 'Freelance',
        '@mobile': { display: 'none' }
      },
      Angel: {
        extends: 'Link',
        href: '/angel-investment',
        fontSize: '13px',
        fontWeight: '400',
        color: 'textTertiary',
        transition: 'color 120ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { color: 'dark' },
        text: 'Angel',
        '@mobile': { display: 'none' }
      },
      CTA: {
        extends: 'Link',
        href: '#contact',
        fontSize: '12px',
        fontWeight: '500',
        color: 'dark',
        padding: '6px 16px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'borderStrong',
        borderRadius: '2px',
        transition: 'background 140ms cubic-bezier(0.0, 0.0, 0.2, 1), color 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { background: 'dark', color: 'white' },
        text: 'Get in touch'
      }
    }
  }
}
