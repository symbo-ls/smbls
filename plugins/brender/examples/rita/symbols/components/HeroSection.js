const IMG_BASE = '//img1.wsimg.com/isteam/ip/15c18bf3-4ed7-4452-806f-cdd970bf3dd6'

export const HeroSection = {
  tag: 'section',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'flex-end',
  attr: { 'data-hero': '' },

  Background: {
    position: 'absolute',
    inset: '0',
    zIndex: '0',

    Photo: {
      tag: 'img',
      attr: {
        src: `https:${IMG_BASE}/EP_130.jpg`,
        alt: 'Rita Katona',
        loading: 'eager'
      },
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: '65% 20%',
      animation: 'heroImageZoom 1800ms cubic-bezier(0.16, 1, 0.3, 1)',
      animationFillMode: 'both'
    },

    Overlay: {
      position: 'absolute',
      inset: '0',
      background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.85) 30%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0.2) 75%, transparent 100%)'
    }
  },

  Content: {
    position: 'relative',
    zIndex: '1',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 48px 80px',
    width: '100%',
    '@tablet': { padding: '0 24px 60px' },

    Eyebrow: {
      fontFamily: "'DM Mono', monospace",
      fontSize: '11px',
      fontWeight: '400',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'white65',
      marginBottom: '24px',
      display: 'block',
      opacity: '0',
      animation: 'fadeInUp 700ms cubic-bezier(0.16, 1, 0.3, 1) 400ms',
      animationFillMode: 'both',
      text: 'Growth Marketing & Sales'
    },

    Headline: {
      tag: 'h1',
      fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
      fontSize: 'clamp(40px, 5.6vw, 72px)',
      fontWeight: '700',
      lineHeight: '1.0',
      letterSpacing: '-0.042em',
      color: 'white',
      maxWidth: '720px',
      opacity: '0',
      animation: 'fadeInUp 800ms cubic-bezier(0.16, 1, 0.3, 1) 550ms',
      animationFillMode: 'both',
      '@mobile': { fontSize: '36px' },
      text: 'Are you looking for help to grow your tech startup?'
    },

    Divider: {
      width: '48px',
      height: '2px',
      background: 'accent',
      margin: '32px 0',
      borderRadius: '1px',
      opacity: '0',
      animation: 'widthExpand 600ms cubic-bezier(0.16, 1, 0.3, 1) 800ms',
      animationFillMode: 'both'
    },

    Sub: {
      tag: 'p',
      fontSize: '17px',
      color: 'white65',
      lineHeight: '1.7',
      maxWidth: '480px',
      margin: '0 0 36px',
      fontWeight: '400',
      opacity: '0',
      animation: 'fadeInUp 700ms cubic-bezier(0.16, 1, 0.3, 1) 900ms',
      animationFillMode: 'both',
      text: 'With 12+ years in the tech startup ecosystem, I help founders scale through coaching, hands-on freelance support, and angel investment.'
    },

    Actions: {
      extends: 'Flex',
      gap: '12px',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      opacity: '0',
      animation: 'fadeInUp 700ms cubic-bezier(0.16, 1, 0.3, 1) 1100ms',
      animationFillMode: 'both',

      Primary: {
        tag: 'a',
        attr: { href: '#contact' },
        extends: 'BtnAccent',
        text: 'Get in touch'
      },
      Ghost: {
        extends: 'Link',
        href: '/about',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 28px',
        fontSize: '13px',
        fontWeight: '500',
        letterSpacing: '-0.01em',
        borderRadius: '6px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'white25',
        color: 'white88',
        background: 'transparent',
        transition: 'all 160ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.4)' },
        text: 'About me'
      }
    }
  },

  ScrollHint: {
    position: 'absolute',
    bottom: '24px',
    left: '50%',
    style: { transform: 'translateX(-50%)' },
    zIndex: '1',
    opacity: '0',
    animation: 'fadeIn 600ms cubic-bezier(0.16, 1, 0.3, 1) 1600ms',
    animationFillMode: 'both',

    Dot: {
      width: '1px',
      height: '32px',
      background: 'rgba(255,255,255,0.25)',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',

      Inner: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(255,255,255,0.6)',
        animation: 'bounce 1800ms cubic-bezier(0.4, 0.0, 0.6, 1) infinite'
      }
    }
  }
}
