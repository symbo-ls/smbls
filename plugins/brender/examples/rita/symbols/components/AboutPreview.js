const IMG_BASE = '//img1.wsimg.com/isteam/ip/15c18bf3-4ed7-4452-806f-cdd970bf3dd6'

export const AboutPreview = {
  tag: 'section',
  id: 'about',
  background: 'white',
  padding: '96px 0',

  Inner: {
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '0 32px',
    '@tablet': { padding: '0 20px' },

    Grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '88px',
      alignItems: 'center',
      '@tablet': { gridTemplateColumns: '1fr', gap: '40px' },

      ImageCol: {
        overflow: 'hidden',
        aspectRatio: '4/5',
        background: 'bgSubtle',
        '@tablet': { aspectRatio: '3/2' },

        Photo: {
          tag: 'img',
          attr: {
            src: `https:${IMG_BASE}/RitaWS.jpeg`,
            alt: 'Rita Katona at a workshop',
            loading: 'lazy'
          },
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 800ms cubic-bezier(0.0, 0.0, 0.2, 1)'
        },
        ':hover img': { transform: 'scale(1.018)' }
      },

      TextCol: {
        Eyebrow: {
          extends: 'Eyebrow',
          text: 'About Rita'
        },
        Title: {
          tag: 'h2',
          extends: 'H2',
          marginBottom: '24px',
          text: 'Founder at Heart'
        },
        Body: {
          tag: 'p',
          color: 'medGray',
          fontSize: '15px',
          lineHeight: '1.78',
          fontWeight: '300',
          text: "I'm a 2x founder with 12+ years in the tech startup ecosystem. Some years ago, I transitioned from my entrepreneurial journey to key roles at various startup supporting organisations, including ZOLLHOF and BCG X."
        },

        Stats: {
          extends: 'StatsRow',
        },

        ReadMore: {
          extends: 'CardLink',
          tag: 'a',
          attr: { href: '/about' },
          text: 'Read my story \u2192'
        }
      }
    }
  }
}
