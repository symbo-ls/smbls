const IMG_BASE = '//img1.wsimg.com/isteam/ip/15c18bf3-4ed7-4452-806f-cdd970bf3dd6'

export default {

  // ─── Home ──────────────────────────────────────────────────────────────────

  '/': {
    tag: 'main',
    extends: 'PageLayout',

    Nav:    { extends: 'Nav' },
    Hero:   { extends: 'HeroSection' },
    About:  { extends: 'AboutPreview' },

    Services: {
      extends: 'ServicesSection',
      Inner: {
        extends: 'ServicesSection.Inner',
        Header: { extends: 'ServicesSection.Inner.Header' },
        Grid: {
          extends: 'ServicesSection.Inner.Grid',
          Coaching:   { extends: 'DarkServiceCard', Icon: { extends: 'DarkServiceCard.Icon', text: '\uD83C\uDFAF' }, Title: { extends: 'DarkServiceCard.Title', text: 'Coaching & Workshops' }, Text: { extends: 'DarkServiceCard.Text', text: "Nurturing your startup's journey: Deep-dive conversations, practical workshops, and personalised coaching for business growth." }, Link: { extends: 'DarkServiceCard.Link', href: '/from-workshops-to-1-on-1s', text: 'Learn more \u2192' } },
          Freelance:  { extends: 'DarkServiceCard', Icon: { extends: 'DarkServiceCard.Icon', text: '\uD83D\uDE80' }, Title: { extends: 'DarkServiceCard.Title', text: 'Freelance Services' }, Text: { extends: 'DarkServiceCard.Text', text: 'Hands-on, operative help with sales and marketing. Impactful strategies and hands-on execution to level up your digital presence.' }, Link: { extends: 'DarkServiceCard.Link', href: '/hire-me-as-a-freelancer', text: 'Learn more \u2192' } },
          References: { extends: 'DarkServiceCard', Icon: { extends: 'DarkServiceCard.Icon', text: '\u2b50' }, Title: { extends: 'DarkServiceCard.Title', text: 'References & Partners' }, Text: { extends: 'DarkServiceCard.Text', text: 'Read about my previous engagements, success stories and references and what partners say about our joint successes.' }, Link: { extends: 'DarkServiceCard.Link', href: '/references-and-partners', text: 'Learn more \u2192' } },
          Angel:      { extends: 'DarkServiceCard', Icon: { extends: 'DarkServiceCard.Icon', text: '\uD83D\uDCA1' }, Title: { extends: 'DarkServiceCard.Title', text: 'Angel Investment' }, Text: { extends: 'DarkServiceCard.Text', text: "As part of the Wise Angels Network, I'm always on the lookout for tech startups to invest in as well as offer my support on growth-related topics." }, Link: { extends: 'DarkServiceCard.Link', href: '/angel-investment', text: 'Learn more \u2192' } }
        }
      }
    },

    Testimonials: {
      extends: 'TestimonialsPreview',
      Inner: {
        extends: 'TestimonialsPreview.Inner',
        Header: { extends: 'TestimonialsPreview.Inner.Header' },
        Grid: {
          extends: 'TestimonialsPreview.Inner.Grid',
          T1: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"Rita\'s three-year journey with our incubator has seen her guide many startups through their market introductions successfully. Her adept use of performance marketing has also remarkably supported our corporate innovation projects."' }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Benjamin Bauer' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'CEO, ZOLLHOF Tech Incubator' } },
          T2: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"In the 4 years of working with Rita as a coach at Berlin Startup School, she has consistently delivered valuable workshops and 1on1 sessions on Digital Marketing, Go-to-Market & Sales strategies."' }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Constantin Schmutzler' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'Founder & CEO, Berlin Startup School' } },
          T3: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"Sessions with Rita are often described as \'mind-opening\', \'insightful\', and \'direct and realistic\'. She is definitely a mentor to keep close when it comes to tech startups."' }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Sergio Borasino' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'MD Founders Club, Startup Wise Guys' } }
        },
        ViewAll: { extends: 'TestimonialsPreview.Inner.ViewAll' }
      }
    },

    Contact:     { extends: 'ContactSection' },
    SiteFooter:  { extends: 'Footer' }
  },

  // ─── About ─────────────────────────────────────────────────────────────────

  '/about': {
    tag: 'main',
    extends: 'PageLayout',

    Nav: { extends: 'Nav' },

    Header: {
      extends: 'PageHeader',
      Back: { extends: 'PageHeaderBack', BackLink: { extends: 'BackLink', href: '/', text: '\u2190 Back' } },
      Inner: {
        extends: 'PageHeader.Inner',
        Center: {
          extends: 'PageHeaderCenter',
          Eyebrow:  { extends: 'Eyebrow', color: 'cream48', text: 'My Story' },
          Title:    { tag: 'h1', extends: 'H2', color: 'cream92', text: 'Founder at Heart & Startup Nurturer' },
          Lead:     { extends: 'Lead', color: 'cream65', maxWidth: 'none', margin: '20px auto 0', fontWeight: '400', text: 'Growth Marketing & Sales Expert with 12+ years in the tech startup ecosystem' }
        }
      }
    },

    MainContent: {
      tag: 'section',
      background: 'warmWhite',
      padding: '104px 0',
      '@tablet': { padding: '80px 0' },
      '@mobile': { padding: '60px 0' },

      Inner: {
        extends: 'Inner',

        Grid: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          '@tablet': { gridTemplateColumns: '1fr', gap: '40px' },

          TextCol: {
            Eyebrow: { extends: 'Eyebrow', text: 'About Me' },
            Title:   { tag: 'h2', extends: 'H2', text: 'Founder at Heart' },

            Intro: {
              tag: 'p',
              color: 'dark',
              fontSize: '16px',
              fontWeight: '500',
              lineHeight: '1.65',
              marginBottom: '16px',
              text: "I'm a 2x founder with 12+ years in the tech startup ecosystem. Some years ago, I transitioned from my entrepreneurial journey to key roles at various startup supporting organisations."
            },

            Body1: {
              tag: 'p',
              color: 'medGray',
              fontSize: '15px',
              lineHeight: '1.75',
              fontWeight: '400',
              text: "My core focus is on practical growth strategies, Go-to-Market and business model development. I've held positions at ZOLLHOF (Germany's fastest growing tech incubator) and BCG X, connecting startups with corporate innovation."
            },

            Body2: {
              tag: 'p',
              color: 'medGray',
              fontSize: '15px',
              lineHeight: '1.75',
              fontWeight: '400',
              marginTop: '16px',
              text: 'I mentor at Techstars, Startup Wise Guys, and Berlin Startup School, drawing from my personal founder experience and work with 150+ startups. My teaching covers multi-channel strategies, smart sales tactics, and data-driven growth approaches.'
            },

            CTAs: {
              extends: 'Flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginTop: '32px',
              justifyContent: 'flex-start',
              ContactBtn:  { tag: 'a', extends: 'BtnPrimary', attr: { href: '#contact' }, text: 'Get in touch' },
              LinkedInBtn: { tag: 'a', extends: 'BtnOutline', attr: { href: 'https://www.linkedin.com/in/rita-kato-growth/', target: '_blank' }, whiteSpace: 'nowrap', text: 'LinkedIn\u00a0\u2197' }
            }
          },

          ImageCol: {
            overflow: 'hidden',
            aspectRatio: '4/5',
            background: 'bgSubtle',
            borderRadius: '12px',
            '@tablet': { aspectRatio: '3/2' },
            Photo: {
              tag: 'img',
              attr: { src: `https:${IMG_BASE}/blob-90ae2e3.png`, alt: 'Rita Katona', loading: 'lazy' },
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top'
            }
          }
        },

        Partners: {
          marginTop: '48px',

          OrgLabel: { extends: 'Eyebrow', marginBottom: '16px', display: 'block', text: 'Organisations & Partners' },

          Chips: {
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            '@tablet': { gridTemplateColumns: 'repeat(3, 1fr)' },
            '@mobile': { gridTemplateColumns: 'repeat(2, 1fr)' },
            gap: '1px',
            background: 'borderLight',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'borderLight',
            borderRadius: '10px',
            overflow: 'hidden',

            C1: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://zollhof.de/assets/zollhof-logo-rgb_black.svg', alt: 'ZOLLHOF', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '28px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'ZOLLHOF' } },
            C2: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://cap.csail.mit.edu/sites/default/files/organization-logos/01-bcgx-logo-black-RGB-small.png', alt: 'BCG X', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '28px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'BCG X' } },
            C3: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://cdn.worldvectorlogo.com/logos/techstars-logo-vector-1.svg', alt: 'Techstars', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '28px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'Techstars' } },
            C4: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://startupwiseguys.com/wp-content/uploads/2023/01/startupwiseguys-logo-red.svg', alt: 'Startup Wise Guys', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '32px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'Startup Wise Guys' } },
            C5: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://static.wixstatic.com/media/a35252_8020b31fa8354d62b22b6bfa8924df05~mv2.png/v1/fill/w_242,h_218,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/BSS%20Logo%202022.png', alt: 'Berlin Startup School', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '36px', width: 'auto', maxWidth: '100px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'Berlin Startup School' } },
            C6: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://swissep.org/assets/static/images/swiss-ep-logo.svg', alt: 'Swiss EP', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '32px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'Swiss EP' } }
          }
        }
      }
    },

    StatsSection: {
      tag: 'section',
      background: 'cream',
      padding: '48px 0',

      Inner: {
        extends: 'Inner',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        '@mobile': { gridTemplateColumns: '1fr 1fr' },

        S1: {
          textAlign: 'center',
          padding: '24px 32px',
          borderRightWidth: '1px',
          borderRightStyle: 'solid',
          borderRightColor: 'borderLight',
          Num: { extends: 'Stat.Num', textAlign: 'center', fontSize: '58px', '@mobile': { fontSize: '42px' }, text: '12+' },
          Lbl: { extends: 'Stat.Lbl', textAlign: 'center', text: 'Years Experience' }
        },
        S2: {
          textAlign: 'center',
          padding: '24px 32px',
          borderRightWidth: '1px',
          borderRightStyle: 'solid',
          borderRightColor: 'borderLight',
          '@mobile': { borderRightWidth: '0' },
          Num: { extends: 'Stat.Num', textAlign: 'center', fontSize: '58px', '@mobile': { fontSize: '42px' }, text: '150+' },
          Lbl: { extends: 'Stat.Lbl', textAlign: 'center', text: 'Startups Helped' }
        },
        S3: {
          textAlign: 'center',
          padding: '24px 32px',
          '@mobile': { gridColumn: 'span 2', borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: 'borderLight' },
          Num: { extends: 'Stat.Num', textAlign: 'center', fontSize: '58px', '@mobile': { fontSize: '42px' }, text: '2\u00d7' },
          Lbl: { extends: 'Stat.Lbl', textAlign: 'center', text: 'Founder' }
        }
      }
    },

    Contact:    { extends: 'ContactSection' },
    SiteFooter: { extends: 'Footer' }
  },

  // ─── Coaching ──────────────────────────────────────────────────────────────

  '/from-workshops-to-1-on-1s': {
    tag: 'main',
    extends: 'PageLayout',

    Nav: { extends: 'Nav' },

    Header: {
      extends: 'PageHeader',
      Back: { extends: 'PageHeaderBack', BackLink: { extends: 'BackLink', href: '/', text: '\u2190 Back' } },
      Inner: {
        extends: 'PageHeader.Inner',
        Center: {
          extends: 'PageHeaderCenter',
          Eyebrow:  { extends: 'Eyebrow', color: 'cream48', text: 'Services' },
          Title:    { tag: 'h1', extends: 'H2', color: 'cream92', text: 'From Workshops to 1-on-1 Coaching' },
          Lead:     { extends: 'Lead', color: 'cream65', maxWidth: 'none', margin: '20px auto 0', fontWeight: '400', text: "Let's elevate your startup's journey: I offer deep-dive sessions, practical workshops, and personalised coaching for business growth." }
        }
      }
    },

    Gallery: {
      tag: 'section',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      height: '380px',
      overflow: 'hidden',
      '@tablet': { height: '260px' },
      '@mobile': { height: '200px', gridTemplateColumns: '1fr 1fr' },

      P1: {
        tag: 'img',
        attr: { src: `https:${IMG_BASE}/RitaWS.jpeg`, alt: 'Rita Katona workshop', loading: 'lazy', onclick: 'openGallery(0)' },
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center center',
        display: 'block',
        cursor: 'pointer',
        transition: 'transform 400ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { transform: 'scale(1.04)' }
      },
      P2: {
        tag: 'img',
        attr: { src: `https:${IMG_BASE}/EP_320.jpg`, alt: 'Coaching session', loading: 'lazy', onclick: 'openGallery(1)' },
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center center',
        display: 'block',
        cursor: 'pointer',
        transition: 'transform 400ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { transform: 'scale(1.04)' }
      },
      P3: {
        tag: 'img',
        attr: { src: `https:${IMG_BASE}/EP_319.jpg`, alt: 'Startup event', loading: 'lazy', onclick: 'openGallery(2)' },
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center center',
        display: 'block',
        cursor: 'pointer',
        transition: 'transform 400ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { transform: 'scale(1.04)' }
      }
    },

    Lightbox: {
      attr: { id: 'gallery-lb' },
      position: 'fixed',
      top: '0', left: '0', right: '0', bottom: '0',
      background: 'rgba(0,0,0,0.96)',
      display: 'none',
      zIndex: '9999',
      alignItems: 'center',
      justifyContent: 'center',

      BgClose: {
        position: 'absolute',
        top: '0', left: '0', right: '0', bottom: '0',
        attr: { onclick: 'closeGallery()' }
      },

      Img: {
        tag: 'img',
        attr: { id: 'gallery-lb-img', alt: '' },
        position: 'relative',
        maxHeight: '90vh',
        maxWidth: '90vw',
        objectFit: 'contain',
        zIndex: '1'
      },

      Prev: {
        tag: 'button',
        text: '\u2039',
        position: 'absolute',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.12)',
        border: 'none',
        color: 'rgba(255,255,255,0.9)',
        fontSize: '32px',
        lineHeight: '1',
        cursor: 'pointer',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2',
        transition: 'background 150ms ease',
        ':hover': { background: 'rgba(255,255,255,0.22)' },
        attr: { onclick: 'prevGallery()' }
      },

      Next: {
        tag: 'button',
        text: '\u203A',
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.12)',
        border: 'none',
        color: 'rgba(255,255,255,0.9)',
        fontSize: '32px',
        lineHeight: '1',
        cursor: 'pointer',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2',
        transition: 'background 150ms ease',
        ':hover': { background: 'rgba(255,255,255,0.22)' },
        attr: { onclick: 'nextGallery()' }
      },

      Close: {
        tag: 'button',
        text: '\u00D7',
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(255,255,255,0.12)',
        border: 'none',
        color: 'rgba(255,255,255,0.9)',
        fontSize: '22px',
        lineHeight: '1',
        cursor: 'pointer',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2',
        transition: 'background 150ms ease',
        ':hover': { background: 'rgba(255,255,255,0.22)' },
        attr: { onclick: 'closeGallery()' }
      }
    },

    GalleryScript: {
      tag: 'script',
      text: `(function(){var _gi=0,_gs=['https://img1.wsimg.com/isteam/ip/15c18bf3-4ed7-4452-806f-cdd970bf3dd6/RitaWS.jpeg','https://img1.wsimg.com/isteam/ip/15c18bf3-4ed7-4452-806f-cdd970bf3dd6/EP_320.jpg','https://img1.wsimg.com/isteam/ip/15c18bf3-4ed7-4452-806f-cdd970bf3dd6/EP_319.jpg'];window.openGallery=function(i){_gi=i;var lb=document.getElementById('gallery-lb');document.getElementById('gallery-lb-img').src=_gs[i];lb.style.display='flex';document.body.style.overflow='hidden';};window.closeGallery=function(){document.getElementById('gallery-lb').style.display='none';document.body.style.overflow='';};window.prevGallery=function(){_gi=(_gi-1+_gs.length)%_gs.length;document.getElementById('gallery-lb-img').src=_gs[_gi];};window.nextGallery=function(){_gi=(_gi+1)%_gs.length;document.getElementById('gallery-lb-img').src=_gs[_gi];};document.addEventListener('keydown',function(e){var lb=document.getElementById('gallery-lb');if(lb&&lb.style.display==='flex'){if(e.key==='ArrowLeft')prevGallery();if(e.key==='ArrowRight')nextGallery();if(e.key==='Escape')closeGallery();}});})();`
    },

    Workshops: {
      tag: 'section',
      background: 'warmWhite',
      padding: '104px 0',
      '@tablet': { padding: '80px 0' },
      '@mobile': { padding: '60px 0' },
      Inner: {
        extends: 'Inner',
        SectionHead: {
          extends: 'SectionHeader',
          Eyebrow: { extends: 'Eyebrow', text: 'Option 1' },
          Title:   { tag: 'h2', extends: 'H2', text: 'Workshops (1.5 \u2013 5 hours)' },
          Lead:    { extends: 'Lead', text: 'Interactive workshops and lectures that provide practical, skill-building experiences. These sessions, taking place online or offline, are designed to impart knowledge and strategies in specific areas.' }
        },
        Grid: {
          extends: 'ItemsGrid',
          W1: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '01' }, Title: { extends: 'ServiceItemCard.Title', text: 'Business Model & Revenue Streams' }, Text: { extends: 'ServiceItemCard.Text', text: 'Interactive sessions on deep-diving into business modelling as well as exploring diverse and sustainable revenue streams for tech businesses, based on Business Model Canvas.' } },
          W2: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '02' }, Title: { extends: 'ServiceItemCard.Title', text: 'Go-to-Market Strategy' }, Text: { extends: 'ServiceItemCard.Text', text: 'Workshops focusing on developing structured, effective go-to-market strategies tailored to your target market and competitive landscape.' } },
          W3: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '03' }, Title: { extends: 'ServiceItemCard.Title', text: 'Customer Analysis & Positioning' }, Text: { extends: 'ServiceItemCard.Text', text: 'Sessions on understanding and analysing target audiences for better business positioning and growth strategy development.' } },
          W4: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '04' }, Title: { extends: 'ServiceItemCard.Title', text: 'Startup Marketing' }, Text: { extends: 'ServiceItemCard.Text', text: 'Comprehensive lectures on marketing fundamentals, strategic planning, and performance marketing for early-stage startups.' } },
          W5: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '05' }, Title: { extends: 'ServiceItemCard.Title', text: 'Growth Channel Exploration' }, Text: { extends: 'ServiceItemCard.Text', text: 'Practical sessions on testing and identifying the most effective growth strategies using the Bullseye Framework.' } },
          W6: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '06' }, Title: { extends: 'ServiceItemCard.Title', text: 'Web Optimization' }, Text: { extends: 'ServiceItemCard.Text', text: 'Workshops dedicated to teaching effective website optimization techniques including SEO, content strategy, and conversion rate optimization.' } }
        }
      }
    },

    Coaching: {
      tag: 'section',
      background: 'cream',
      padding: '104px 0',
      '@tablet': { padding: '80px 0' },
      '@mobile': { padding: '60px 0' },
      Inner: {
        extends: 'Inner',
        SectionHead: {
          extends: 'SectionHeader',
          Eyebrow: { extends: 'Eyebrow', text: 'Option 2' },
          Title:   { tag: 'h2', extends: 'H2', text: '1-on-1 Coaching' },
          Lead:    { extends: 'Lead', text: 'Personalized coaching sessions designed to serve the unique needs of startups. These sessions focus on individual strategies, offering tailored guidance and actionable insights for startup growth.' }
        },
        Grid: {
          extends: 'ItemsGrid',
          background: 'transparent',
          childExtends: { background: 'transparent' },
          C1: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '01' }, Title: { extends: 'ServiceItemCard.Title', text: 'Go-to-Market & Growth Strategy' }, Text: { extends: 'ServiceItemCard.Text', text: 'Personalized strategies for structuring market entry, focusing on individual goals, target audiences and best channels to consider.' } },
          C2: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '02' }, Title: { extends: 'ServiceItemCard.Title', text: 'User Discovery & Testing' }, Text: { extends: 'ServiceItemCard.Text', text: 'Guidance on product/service testing methods and user discovery to gain valuable insights and improve your offerings.' } },
          C3: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '03' }, Title: { extends: 'ServiceItemCard.Title', text: 'Audience Testing' }, Text: { extends: 'ServiceItemCard.Text', text: 'Tailored coaching on identifying and engaging the right customer segments for startup success.' } },
          C4: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '04' }, Title: { extends: 'ServiceItemCard.Title', text: 'Data-Driven Strategy' }, Text: { extends: 'ServiceItemCard.Text', text: 'Advice on establishing a data-centric approach, including setting up KPIs and measurement tactics.' } },
          C5: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '05' }, Title: { extends: 'ServiceItemCard.Title', text: 'Website Optimization' }, Text: { extends: 'ServiceItemCard.Text', text: 'Personalized recommendations for enhancing your business website for better user experience and marketing efficiency.' } }
        }
      }
    },

    Partners: {
      tag: 'section',
      background: 'warmWhite',
      padding: '64px 0',
      '@mobile': { padding: '48px 0' },
      Inner: {
        extends: 'Inner',
        textAlign: 'center',
        Label: { extends: 'Eyebrow', marginBottom: '24px', display: 'block', text: 'Often in cooperation with' },
        Chips: {
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          '@tablet': { gridTemplateColumns: 'repeat(2, 1fr)' },
          gap: '1px',
          background: 'borderLight',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'borderLight',
          borderRadius: '10px',
          overflow: 'hidden',
          C1: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://static.wixstatic.com/media/a35252_8020b31fa8354d62b22b6bfa8924df05~mv2.png/v1/fill/w_242,h_218,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/BSS%20Logo%202022.png', alt: 'Berlin Startup School', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '36px', width: 'auto', maxWidth: '100px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'Berlin Startup School' } },
          C2: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://startupwiseguys.com/wp-content/uploads/2023/01/startupwiseguys-logo-red.svg', alt: 'Startup Wise Guys', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '32px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'Startup Wise Guys' } },
          C3: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://cdn.prod.website-files.com/65b8cc282d03ffce99110be9/65ba5b3d50103d8529e0873a_XS_BIA-Logo-Full%20Colour-reverse-RGB.png', alt: 'Berlin Innovation Agency', onerror: "this.style.display='none'" }, filter: 'grayscale(1) invert(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0) invert(1)' }, height: '32px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'Berlin Innovation Agency' } },
          C4: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://swissep.org/assets/static/images/swiss-ep-logo.svg', alt: 'Swiss EP', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '32px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'Swiss EP' } }
        }
      }
    },

    Contact:    { extends: 'ContactSection' },
    SiteFooter: { extends: 'Footer' }
  },

  // ─── Freelance ─────────────────────────────────────────────────────────────

  '/hire-me-as-a-freelancer': {
    tag: 'main',
    extends: 'PageLayout',

    Nav: { extends: 'Nav' },

    Header: {
      extends: 'PageHeader',
      Back: { extends: 'PageHeaderBack', BackLink: { extends: 'BackLink', href: '/', text: '\u2190 Back' } },
      Inner: {
        extends: 'PageHeader.Inner',
        Center: {
          extends: 'PageHeaderCenter',
          Eyebrow:  { extends: 'Eyebrow', color: 'cream48', text: 'Freelance Services' },
          Title:    { tag: 'h1', extends: 'H2', color: 'cream92', text: 'Hire me as a Freelancer' },
          Lead:     { extends: 'Lead', color: 'cream65', maxWidth: 'none', margin: '20px auto 0', fontWeight: '400', text: 'Need hands-on, operative help with sales and marketing? I deliver impactful strategies and hands-on execution to level up your digital presence and drive meaningful engagement.' }
        }
      }
    },

    Services: {
      tag: 'section',
      background: 'warmWhite',
      padding: '104px 0',
      '@tablet': { padding: '80px 0' },
      '@mobile': { padding: '60px 0' },
      Inner: {
        extends: 'Inner',
        Intro: {
          tag: 'p',
          color: 'medGray',
          fontSize: '15px',
          lineHeight: '1.75',
          maxWidth: '680px',
          margin: '0 auto 48px auto',
          textAlign: 'center',
          fontWeight: '400',
          text: "I bring 12+ years of hands-on startup experience to every engagement. Whether you're looking to build your marketing foundation or scale existing efforts, I work as a true partner in your growth journey."
        },
        Grid: {
          extends: 'ItemsGrid',
          S1: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '01' }, Title: { extends: 'ServiceItemCard.Title', text: 'Digital Advertising & Social Media' }, Text: { extends: 'ServiceItemCard.Text', text: 'Selecting and setting up the most effective channels for your brand. Implementing overarching ad campaigns tailored to your objectives (Google, META, LinkedIn and more).' } },
          S2: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '02' }, Title: { extends: 'ServiceItemCard.Title', text: 'Content Strategy & Creation' }, Text: { extends: 'ServiceItemCard.Text', text: 'Crafting content plans informed by market trends and SEO research. Planning and overseeing content such as blogs, videos, and case studies. Managing and collaborating with third-party freelancers.' } },
          S3: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '03' }, Title: { extends: 'ServiceItemCard.Title', text: 'SEO Optimization' }, Text: { extends: 'ServiceItemCard.Text', text: 'Conducting comprehensive website and content reviews for SEO enhancement. Integrating targeted keywords and on-site optimization for better Google ranking. Improving technical SEO including page load speed and mobile optimization.' } },
          S4: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '04' }, Title: { extends: 'ServiceItemCard.Title', text: 'Sales & Marketing Strategy' }, Text: { extends: 'ServiceItemCard.Text', text: 'Developing full-scale sales and marketing strategies. Customising messaging and positioning for various target groups and use cases. Fostering lead generation, outreach, and communication tactics to drive growth.' } },
          S5: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '05' }, Title: { extends: 'ServiceItemCard.Title', text: 'Interim CMO' }, Text: { extends: 'ServiceItemCard.Text', text: 'Planning, leading and executing all growth-related initiatives. Strategizing and testing various marketing channels for optimal reach. Hiring and mentoring team members to enhance capabilities. Push sales and marketing operations to accelerate business growth.' } },
          S6: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '06' }, Title: { extends: 'ServiceItemCard.Title', text: 'Analytics & Tracking' }, Text: { extends: 'ServiceItemCard.Text', text: 'Setting up and optimizing analytics infrastructure across your digital channels. Defining KPIs, building dashboards, and implementing tracking to ensure every marketing decision is backed by data.' } }
        }
      }
    },

    CTA: {
      tag: 'section',
      background: 'cream',
      padding: '104px 0',
      '@tablet': { padding: '80px 0' },
      '@mobile': { padding: '60px 0' },
      Inner: {
        extends: 'Inner',
        textAlign: 'center',
        Title:  { tag: 'h2', extends: 'H2', text: 'Ready to grow together?' },
        Lead:   { extends: 'Lead', margin: '16px auto 32px auto', text: "Let's discuss your specific needs and how I can help accelerate your growth." },
        Btn:    { tag: 'a', extends: 'BtnPrimary', attr: { href: '#contact' }, text: 'Get in touch' }
      }
    },

    Contact:    { extends: 'ContactSection' },
    SiteFooter: { extends: 'Footer' }
  },

  // ─── References ────────────────────────────────────────────────────────────

  '/references-and-partners': {
    tag: 'main',
    extends: 'PageLayout',

    Nav: { extends: 'Nav' },

    Header: {
      extends: 'PageHeader',
      Back: { extends: 'PageHeaderBack', BackLink: { extends: 'BackLink', href: '/', text: '\u2190 Back' } },
      Inner: {
        extends: 'PageHeader.Inner',
        Center: {
          extends: 'PageHeaderCenter',
          Eyebrow:  { extends: 'Eyebrow', color: 'cream48', text: 'Social Proof' },
          Title:    { tag: 'h1', extends: 'H2', color: 'cream92', text: 'References & Partners' },
          Lead:     { extends: 'Lead', color: 'cream65', maxWidth: 'none', margin: '20px auto 0', fontWeight: '400', text: 'See what partners say about our joint successes. These testimonials reflect the nature and great results of our collaborations.' }
        }
      }
    },

    Testimonials: {
      tag: 'section',
      background: 'cream',
      padding: '104px 0',
      '@tablet': { padding: '80px 0' },
      '@mobile': { padding: '60px 0' },
      Inner: {
        extends: 'Inner',
        Grid: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'transparent',
          borderRadius: '12px',
          overflow: 'hidden',
          '@tablet': { gridTemplateColumns: '1fr 1fr' },
          '@mobile': { gridTemplateColumns: '1fr' },

          T1: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"Our startup, Heynanny, has greatly benefited from Rita\'s expertise, especially in refining our go-to-market strategy. Her guidance on data analysis and tracking has been also pivotal in making more informed decisions. 100% recommended to startups looking into these areas!"' }, Photo: { extends: 'TestimonialCard.Photo', display: 'block', attr: { src: `https:${IMG_BASE}/%C2%A9%20Tribunalova%20_%20Julia%20Kahle.jpeg`, alt: 'Julia Kahle' } }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Julia Kahle' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'Co-Founder & CEO, Heynanny' } },
          T2: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"In the 4 years of working with Rita as a coach at Berlin Startup School, she has consistently delivered valuable workshops and 1on1 sessions on Digital Marketing, Go-to-Market & Sales strategies. Her insights and personalized coaching have greatly impacted our startup community, driving its growth."' }, Photo: { extends: 'TestimonialCard.Photo', display: 'block', attr: { src: `https:${IMG_BASE}/Tino2.jpeg`, alt: 'Constantin Schmutzler' } }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Constantin Schmutzler' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'Founder & CEO, Berlin Startup School' } },
          T3: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"Rita\'s guidance was pivotal for refining our digital campaigns on Google and Meta platforms. She also helped precise tracking setup, and gave actionable insights on email and content strategies that boosted our engagement."' }, Photo: { extends: 'TestimonialCard.Photo', display: 'block', attr: { src: `https:${IMG_BASE}/Tobi.jpeg`, alt: 'Tobias Bäumler' } }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Tobias B\u00e4umler' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'Co-Founder & COO, VITAS.ai' } },
          T4: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"At Swiss EP, we value the authenticity and insights of entrepreneurs who have forged their own paths. Rita brought this to life at our latest Founders Retreat, where her expertise in sales was a great contribution to the advancement of our 14 participating teams."' }, Photo: { extends: 'TestimonialCard.Photo', display: 'block', attr: { src: `https:${IMG_BASE}/EP_64.jpg`, alt: 'Jakob Modéer' } }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Jakob Mod\u00e9er' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'Program Manager, Swiss Entrepreneurship Programme' } },
          T5: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"Her valuable insights in biz.dev, marketing, and sales have proven to be a great support for our startups\' growth, leading them to successfully test and prioritise growth channels. Her positive hands-on approach is well appreciated by our teams, putting her as one of our highest NPS-ranked coaches!"' }, Photo: { extends: 'TestimonialCard.Photo', display: 'block', attr: { src: `https:${IMG_BASE}/blob-6e8428f.png`, alt: 'Lou Kest' } }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Lou Kest' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'Project Manager, Berlin Innovation Agency' } },
          T6: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"Rita\'s three-year journey with our incubator has seen her guide many startups through their market introductions successfully. Her adept use of performance marketing on platforms like Google, LinkedIn, and META has also remarkably supported our corporate innovation projects."' }, Photo: { extends: 'TestimonialCard.Photo', display: 'block', attr: { src: `https:${IMG_BASE}/MB231103_ZoHo_517-lowres.jpg`, alt: 'Benjamin Bauer' } }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Benjamin Bauer' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'CEO, ZOLLHOF Tech Incubator' } },
          T7: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"Sessions with Rita are often described as \'mind-opening\', \'insightful\', and \'direct and realistic\'. Her in-depth knowledge of the sector allows her to bring value to the table in no more than few minutes. She is definitely a mentor to keep close to you when it comes to tech startups."' }, Photo: { extends: 'TestimonialCard.Photo', display: 'block', attr: { src: `https:${IMG_BASE}/20220525_202701.jpg`, alt: 'Sergio Borasino' } }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Sergio Borasino' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'MD Founders Club, Startup Wise Guys' } }
        }
      }
    },

    Partners: {
      tag: 'section',
      background: 'warmWhite',
      padding: '64px 0',
      '@mobile': { padding: '48px 0' },
      Inner: {
        extends: 'Inner',
        textAlign: 'center',
        Label: { extends: 'Eyebrow', marginBottom: '24px', display: 'block', text: 'Organisations I worked with' },
        Chips: {
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          '@tablet': { gridTemplateColumns: 'repeat(3, 1fr)' },
          '@mobile': { gridTemplateColumns: 'repeat(2, 1fr)' },
          gap: '1px',
          background: 'borderLight',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'borderLight',
          borderRadius: '10px',
          overflow: 'hidden',
          C1: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://zollhof.de/assets/zollhof-logo-rgb_black.svg', alt: 'ZOLLHOF', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '28px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'ZOLLHOF' } },
          C2: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://static.wixstatic.com/media/a35252_8020b31fa8354d62b22b6bfa8924df05~mv2.png/v1/fill/w_242,h_218,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/BSS%20Logo%202022.png', alt: 'Berlin Startup School', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '36px', width: 'auto', maxWidth: '100px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'Berlin Startup School' } },
          C3: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://startupwiseguys.com/wp-content/uploads/2023/01/startupwiseguys-logo-red.svg', alt: 'Startup Wise Guys', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '32px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'Startup Wise Guys' } },
          C4: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://cdn.prod.website-files.com/65b8cc282d03ffce99110be9/65ba5b3d50103d8529e0873a_XS_BIA-Logo-Full%20Colour-reverse-RGB.png', alt: 'Berlin Innovation Agency', onerror: "this.style.display='none'" }, filter: 'grayscale(1) invert(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0) invert(1)' }, height: '32px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'Berlin Innovation Agency' } },
          C5: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '24px 16px', background: 'warmWhite', transition: 'background 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { background: 'white' }, Logo: { tag: 'img', attr: { src: 'https://swissep.org/assets/static/images/swiss-ep-logo.svg', alt: 'Swiss EP', onerror: "this.style.display='none'" }, filter: 'grayscale(1)', transition: 'filter 180ms cubic-bezier(0.0, 0.0, 0.2, 1)', ':hover': { filter: 'grayscale(0)' }, height: '32px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }, Name: { fontSize: '10px', fontFamily: "'DM Mono', monospace", color: 'textTertiary', letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', text: 'Swiss EP' } }
        }
      }
    },

    Contact:    { extends: 'ContactSection' },
    SiteFooter: { extends: 'Footer' }
  },

  // ─── Angel Investment ──────────────────────────────────────────────────────

  '/angel-investment': {
    tag: 'main',
    extends: 'PageLayout',

    Nav: { extends: 'Nav' },

    Header: {
      extends: 'PageHeader',
      Back: { extends: 'PageHeaderBack', BackLink: { extends: 'BackLink', href: '/', text: '\u2190 Back' } },
      Inner: {
        extends: 'PageHeader.Inner',
        Center: {
          extends: 'PageHeaderCenter',
          Eyebrow:  { extends: 'Eyebrow', color: 'cream48', text: 'Investment' },
          Title:    { tag: 'h1', extends: 'H2', color: 'cream92', text: 'Looking for Angel Investment?' },
          Lead:     { extends: 'Lead', color: 'cream65', maxWidth: 'none', margin: '20px auto 0', fontWeight: '400', text: "As a proud member of the Wise Angels Network, I'm always on the lookout for tech startups to invest in." }
        }
      }
    },

    WANInfo: {
      tag: 'section',
      background: 'cream',
      padding: '104px 0',
      '@tablet': { padding: '80px 0' },
      '@mobile': { padding: '60px 0' },
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'borderLight',
      Inner: {
        extends: 'Inner',
        Eyebrow: { extends: 'Eyebrow', text: 'About WAN' },
        Title:   { tag: 'h2', extends: 'H2', marginTop: '8px', text: 'Wise Angels Network' },
        Lead:    { extends: 'Lead', text: 'Wise Angels Network is an angel investor community headquartered in Europe, passionately committed to supporting startups during their critical early stages.' },
        Body:    { tag: 'p', color: 'medGray', fontSize: '15px', lineHeight: '1.75', maxWidth: '640px', marginTop: '8px', fontWeight: '400', text: 'Our mission goes beyond just financial backing; we aim to empower startup founders by offering invaluable guidance in areas such as marketing, sales, operations, and more.' },
        WANLink: { extends: 'CardLink', tag: 'a', display: 'inline-flex', marginTop: '16px', attr: { href: 'https://wiseangels.network', target: '_blank', rel: 'noopener' }, text: 'Learn more about WAN \u2192' },

        WANBlock: {
          extends: 'Flex',
          background: 'warmWhite',
          padding: '40px',
          borderRadius: '12px',
          alignItems: 'center',
          gap: '32px',
          marginTop: '48px',
          '@mobile': { flexDirection: 'column', alignItems: 'flex-start', padding: '28px' },

          Logo: {
            tag: 'img',
            attr: { src: `https:${IMG_BASE}/WAN-logo.png`, alt: 'Wise Angels Network', loading: 'lazy' },
            width: '120px',
            flexShrink: '0'
          },

          Info: {
            Title: {
              tag: 'h3',
              fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
              fontSize: '17px',
              fontWeight: '600',
              letterSpacing: '-0.02em',
              color: 'dark',
              marginBottom: '10px',
              text: 'Wise Angels Network Member'
            },
            Text: {
              tag: 'p',
              fontSize: '14px',
              color: 'textSecondary',
              lineHeight: '1.72',
              fontWeight: '400',
              text: "As an individual, but also as proud member of the Wise Angels Network, I'm always on the lookout for tech startups to invest in as well as offer my support on growth-related topics and beyond!"
            }
          }
        }
      }
    },

    Main: {
      tag: 'section',
      background: 'warmWhite',
      padding: '104px 0',
      '@tablet': { padding: '80px 0' },
      '@mobile': { padding: '60px 0' },
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'borderLight',
      Inner: {
        extends: 'Inner',

        CriteriaHead: {
          extends: 'SectionHeader',
          marginBottom: '16px',
          Eyebrow: { extends: 'Eyebrow', text: 'Investment Criteria' },
          Title:   { tag: 'h2', extends: 'H2', text: 'What I look for in startups' }
        },

        Criteria: {
          extends: 'Flex',
          flexFlow: 'column',
          Crit1: { extends: 'Criterion', Check: { extends: 'Criterion.Check', text: '\u2713' }, Text: { extends: 'Criterion.Text', text: 'The product is required to be in, or beyond, the Minimum Viable Product (MVP) stage' } },
          Crit2: { extends: 'Criterion', Check: { extends: 'Criterion.Check', text: '\u2713' }, Text: { extends: 'Criterion.Text', text: 'Traction: Either paying beta testers/customers or a formal letter of intent' } },
          Crit3: { extends: 'Criterion', Check: { extends: 'Criterion.Check', text: '\u2713' }, Text: { extends: 'Criterion.Text', text: 'A minimum of one year of the strategic roadmap has been outlined' } }
        }
      }
    },

    CTA: {
      tag: 'section',
      background: 'warmWhite',
      padding: '104px 0',
      '@tablet': { padding: '80px 0' },
      '@mobile': { padding: '60px 0' },
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'borderLight',
      Inner: {
        extends: 'Inner',
        textAlign: 'center',
        Title: { tag: 'h2', extends: 'H2', text: 'Ready to pitch your startup?' },
        Lead:  { extends: 'Lead', margin: '16px auto 32px auto', text: "If you think your startup meets the criteria, I'd love to hear from you." },
        Btn:   { tag: 'a', extends: 'BtnPrimary', attr: { href: '#contact' }, text: 'Get in touch' }
      }
    },

    AngelGallery: {
      tag: 'section',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      height: '380px',
      overflow: 'hidden',
      '@tablet': { height: '260px' },
      '@mobile': { height: '200px', gridTemplateColumns: '1fr 1fr' },

      P1: {
        tag: 'img',
        attr: { src: `https:${IMG_BASE}/EP_130.jpg`, alt: 'Rita Katona presenting', loading: 'lazy', onclick: 'openAngelGallery(0)' },
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center center',
        display: 'block',
        cursor: 'pointer',
        transition: 'transform 400ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { transform: 'scale(1.04)' }
      },
      P2: {
        tag: 'img',
        attr: { src: `https:${IMG_BASE}/Screenshot%202024-01-25%20at%2008.38.48.png`, alt: 'Rita Katona presenting', loading: 'lazy', onclick: 'openAngelGallery(1)' },
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center center',
        display: 'block',
        cursor: 'pointer',
        transition: 'transform 400ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { transform: 'scale(1.04)' }
      },
      P3: {
        tag: 'img',
        attr: { src: 'https://img1.wsimg.com/isteam/ip/15c18bf3-4ed7-4452-806f-cdd970bf3dd6/Screenshot%202024-01-11%20at%2016.48.19.png/:/cr=t:35.92%25,l:0%25,w:100%25,h:63.53%25/rs=w:1200,h:600,cg:true', alt: 'Rita Katona workshop session', loading: 'lazy', onclick: 'openAngelGallery(2)' },
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center center',
        display: 'block',
        cursor: 'pointer',
        transition: 'transform 400ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { transform: 'scale(1.04)' }
      }
    },

    AngelLightbox: {
      attr: { id: 'angel-gallery-lb' },
      position: 'fixed',
      top: '0', left: '0', right: '0', bottom: '0',
      background: 'rgba(0,0,0,0.96)',
      display: 'none',
      zIndex: '9999',
      alignItems: 'center',
      justifyContent: 'center',

      BgClose: {
        position: 'absolute',
        top: '0', left: '0', right: '0', bottom: '0',
        attr: { onclick: 'closeAngelGallery()' }
      },

      Img: {
        tag: 'img',
        attr: { id: 'angel-gallery-lb-img', alt: '' },
        position: 'relative',
        maxHeight: '90vh',
        maxWidth: '90vw',
        objectFit: 'contain',
        zIndex: '1'
      },

      Prev: {
        tag: 'button',
        text: '\u2039',
        position: 'absolute',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.12)',
        border: 'none',
        color: 'rgba(255,255,255,0.9)',
        fontSize: '32px',
        lineHeight: '1',
        cursor: 'pointer',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2',
        transition: 'background 150ms ease',
        ':hover': { background: 'rgba(255,255,255,0.22)' },
        attr: { onclick: 'prevAngelGallery()' }
      },

      Next: {
        tag: 'button',
        text: '\u203A',
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.12)',
        border: 'none',
        color: 'rgba(255,255,255,0.9)',
        fontSize: '32px',
        lineHeight: '1',
        cursor: 'pointer',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2',
        transition: 'background 150ms ease',
        ':hover': { background: 'rgba(255,255,255,0.22)' },
        attr: { onclick: 'nextAngelGallery()' }
      },

      Close: {
        tag: 'button',
        text: '\u00D7',
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(255,255,255,0.12)',
        border: 'none',
        color: 'rgba(255,255,255,0.9)',
        fontSize: '22px',
        lineHeight: '1',
        cursor: 'pointer',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2',
        transition: 'background 150ms ease',
        ':hover': { background: 'rgba(255,255,255,0.22)' },
        attr: { onclick: 'closeAngelGallery()' }
      }
    },

    AngelGalleryScript: {
      tag: 'script',
      text: `(function(){var _gi=0,_gs=['https://img1.wsimg.com/isteam/ip/15c18bf3-4ed7-4452-806f-cdd970bf3dd6/EP_130.jpg','https://img1.wsimg.com/isteam/ip/15c18bf3-4ed7-4452-806f-cdd970bf3dd6/Screenshot%202024-01-25%20at%2008.38.48.png','https://img1.wsimg.com/isteam/ip/15c18bf3-4ed7-4452-806f-cdd970bf3dd6/Screenshot%202024-01-11%20at%2016.48.19.png'];window.openAngelGallery=function(i){_gi=i;var lb=document.getElementById('angel-gallery-lb');document.getElementById('angel-gallery-lb-img').src=_gs[i];lb.style.display='flex';document.body.style.overflow='hidden';};window.closeAngelGallery=function(){document.getElementById('angel-gallery-lb').style.display='none';document.body.style.overflow='';};window.prevAngelGallery=function(){_gi=(_gi-1+_gs.length)%_gs.length;document.getElementById('angel-gallery-lb-img').src=_gs[_gi];};window.nextAngelGallery=function(){_gi=(_gi+1)%_gs.length;document.getElementById('angel-gallery-lb-img').src=_gs[_gi];};document.addEventListener('keydown',function(e){var lb=document.getElementById('angel-gallery-lb');if(lb&&lb.style.display==='flex'){if(e.key==='ArrowLeft')prevAngelGallery();if(e.key==='ArrowRight')nextAngelGallery();if(e.key==='Escape')closeAngelGallery();}});})();`
    },

    Contact:    { extends: 'ContactSection' },
    SiteFooter: { extends: 'Footer' }
  }
}
