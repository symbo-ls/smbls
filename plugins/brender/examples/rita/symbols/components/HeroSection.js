const IMG_BASE = '//img1.wsimg.com/isteam/ip/15c18bf3-4ed7-4452-806f-cdd970bf3dd6'

export const HeroSection = {
  extends: 'Flex',
  tag: 'section',
  minHeight: '100vh',
  flexAlign: 'center flex-start',
  position: 'relative',
  overflow: 'hidden',
  background: '#060606',
  padding: '80px 0 60px',

  Bg: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '0',
    backgroundImage: `url('https:${IMG_BASE}/EP_130.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: '65% center',
    '@mobile': { backgroundPosition: '72% center' }
  },

  // Gradient overlay via pseudo-element
  ':after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '1',
    background: 'linear-gradient(to right, rgba(6,6,6,0.97) 0%, rgba(6,6,6,0.92) 35%, rgba(6,6,6,0.68) 56%, rgba(6,6,6,0.22) 82%, rgba(6,6,6,0.08) 100%)',
    '@mobile': { background: 'rgba(6,6,6,0.88)' }
  },

  Content: {
    position: 'relative',
    zIndex: '2',
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '0 32px',
    textAlign: 'left',
    '@tablet': { padding: '0 20px' },

    Eyebrow: {
      display: 'inline-block',
      fontSize: '11px',
      fontWeight: '500',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'white38',
      marginBottom: '32px'
    },

    Headline: {
      tag: 'h1',
      fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
      fontSize: 'clamp(52px, 8.5vw, 114px)',
      fontWeight: '700',
      lineHeight: '0.94',
      letterSpacing: '-0.044em',
      color: 'white',
      maxWidth: '860px',
      '@mobile': { fontSize: '44px' },
      text: 'Are you looking for help to grow your tech startup?'
    },

    Divider: {
      width: '40px',
      height: '1px',
      background: 'white15',
      margin: '36px 0'
    },

    Sub: {
      tag: 'p',
      fontSize: 'clamp(15px, 1.6vw, 17px)',
      color: 'white52',
      lineHeight: '1.72',
      maxWidth: '380px',
      margin: '0 0 40px',
      fontWeight: '300',
      text: 'With 12+ years in the tech startup ecosystem, I help founders scale through coaching, hands-on freelance support, and angel investment.'
    },

    Actions: {
      extends: 'Flex',
      gap: '10px',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',

      Primary: {
        tag: 'a',
        attr: { href: '#contact' },
        extends: 'BtnPrimary',
        background: 'white',
        color: 'dark',
        ':hover': { background: 'white88', color: 'dark' },
        text: 'Get in touch'
      },
      Ghost: {
        tag: 'a',
        attr: { href: '/about' },
        extends: 'BtnGhost',
        background: 'transparent',
        color: 'white65',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'white22',
        ':hover': { background: 'white07', color: 'white92', borderColor: 'darkWhite35' },
        text: 'About me'
      }
    }
  },

  ScrollHint: {
    extends: 'Flex',
    flexFlow: 'column',
    flexAlign: 'center center',
    position: 'absolute',
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '2',
    gap: '7px',
    color: 'white25',
    fontSize: '9px',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    animation: 'fadeIn 1s both',
    animationDelay: '1.2s',

    Arrow: {
      animation: 'bounce 3s cubic-bezier(0.0, 0.0, 0.2, 1) infinite',
      fontSize: '10px',
      text: '\u2193'
    },
    Lbl: { text: 'Scroll' }
  }
}
