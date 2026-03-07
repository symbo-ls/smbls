const IMG_BASE = '//img1.wsimg.com/isteam/ip/15c18bf3-4ed7-4452-806f-cdd970bf3dd6'

export const AboutPreview = {
  tag: 'section',
  id: 'about',
  background: 'warmWhite',
  padding: '80px 0',
  '@mobile': { padding: '60px 0' },

  Inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 48px',
    '@tablet': { padding: '0 24px' },

    Grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '56px',
      alignItems: 'center',
      '@tablet': { gridTemplateColumns: '1fr', gap: '40px' },

      ImageCol: {
        overflow: 'hidden',
        aspectRatio: '4/5',
        background: 'bgSubtle',
        borderRadius: '12px',
        transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        ':hover': { transform: 'translateY(-6px)', boxShadow: '0 24px 64px rgba(0,0,0,0.1)' },
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
          transition: 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)'
        },
        ':hover img': { transform: 'scale(1.04)' }
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
          fontWeight: '400',
          text: "I'm a 2x founder with 12+ years in the tech startup ecosystem. Some years ago, I transitioned from my entrepreneurial journey to key roles at various startup supporting organisations, including ZOLLHOF and BCG X."
        },

        Stats: {
          extends: 'StatsRow',
        },

        ReadMore: {
          extends: 'CardLink',
          href: '/about',
          text: 'Read my story \u2192'
        }
      }
    }
  }
}
