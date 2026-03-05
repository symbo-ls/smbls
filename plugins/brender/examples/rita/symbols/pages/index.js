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
          Coaching:   { extends: 'DarkServiceCard', Icon: { extends: 'DarkServiceCard.Icon', text: '\uD83C\uDFAF' }, Title: { extends: 'DarkServiceCard.Title', text: 'Coaching & Workshops' }, Text: { extends: 'DarkServiceCard.Text', text: "Nurturing your startup's journey: Deep-dive conversations, practical workshops, and personalised coaching for business growth." }, Link: { extends: 'DarkServiceCard.Link', attr: { href: '/from-workshops-to-1-on-1s' }, text: 'Learn more \u2192' } },
          Freelance:  { extends: 'DarkServiceCard', Icon: { extends: 'DarkServiceCard.Icon', text: '\uD83D\uDE80' }, Title: { extends: 'DarkServiceCard.Title', text: 'Freelance Services' }, Text: { extends: 'DarkServiceCard.Text', text: 'Hands-on, operative help with sales and marketing. Impactful strategies and hands-on execution to level up your digital presence.' }, Link: { extends: 'DarkServiceCard.Link', attr: { href: '/hire-me-as-a-freelancer' }, text: 'Learn more \u2192' } },
          References: { extends: 'DarkServiceCard', Icon: { extends: 'DarkServiceCard.Icon', text: '\u2b50' }, Title: { extends: 'DarkServiceCard.Title', text: 'References & Partners' }, Text: { extends: 'DarkServiceCard.Text', text: 'Read about my previous engagements, success stories and references and what partners say about our joint successes.' }, Link: { extends: 'DarkServiceCard.Link', attr: { href: '/references-and-partners' }, text: 'Learn more \u2192' } },
          Angel:      { extends: 'DarkServiceCard', Icon: { extends: 'DarkServiceCard.Icon', text: '\uD83D\uDCA1' }, Title: { extends: 'DarkServiceCard.Title', text: 'Angel Investment' }, Text: { extends: 'DarkServiceCard.Text', text: "As part of the Wise Angels Network, I'm always on the lookout for tech startups to invest in as well as offer my support on growth-related topics." }, Link: { extends: 'DarkServiceCard.Link', attr: { href: '/angel-investment' }, text: 'Learn more \u2192' } }
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
      Inner: {
        extends: 'PageHeader.Inner',
        BackLink: { extends: 'BackLink', attr: { href: '/' }, text: '\u2190 Back' },
        Eyebrow:  { extends: 'Eyebrow', color: 'white22', text: 'My Story' },
        Title:    { tag: 'h1', extends: 'H2', color: 'white', text: 'Founder at Heart & Startup Nurturer' },
        Lead:     { extends: 'Lead', color: 'darkWhite35', maxWidth: 'none', margin: '20px auto 0', fontWeight: '300', text: 'Growth Marketing & Sales Expert with 12+ years in the tech startup ecosystem' }
      }
    },

    MainContent: {
      tag: 'section',
      background: 'white',
      padding: '96px 0',

      Inner: {
        extends: 'Inner',

        Grid: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '88px',
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
              fontWeight: '300',
              text: "My core focus is on practical growth strategies, Go-to-Market and business model development. I've held positions at ZOLLHOF (Germany's fastest growing tech incubator) and BCG X, connecting startups with corporate innovation."
            },

            Body2: {
              tag: 'p',
              color: 'medGray',
              fontSize: '15px',
              lineHeight: '1.75',
              fontWeight: '300',
              marginTop: '16px',
              text: 'I mentor at Techstars, Startup Wise Guys, and Berlin Startup School, drawing from my personal founder experience and work with 150+ startups. My teaching covers multi-channel strategies, smart sales tactics, and data-driven growth approaches.'
            },

            OrgLabel: { extends: 'Eyebrow', marginTop: '32px', marginBottom: '16px', display: 'block', text: 'Organisations & Partners' },

            Chips: {
              extends: 'Flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginTop: '16px',
              C1: { extends: 'Chip', text: 'ZOLLHOF' },
              C2: { extends: 'Chip', text: 'BCG X' },
              C3: { extends: 'Chip', text: 'Techstars' },
              C4: { extends: 'Chip', text: 'Startup Wise Guys' },
              C5: { extends: 'Chip', text: 'Berlin Startup School' },
              C6: { extends: 'Chip', text: 'Swiss EP' }
            },

            CTAs: {
              extends: 'Flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginTop: '32px',
              justifyContent: 'flex-start',
              ContactBtn:  { tag: 'a', extends: 'BtnPrimary', attr: { href: '#contact' }, text: 'Get in touch' },
              LinkedInBtn: { tag: 'a', extends: 'BtnOutline', attr: { href: 'https://linkedin.com/in/rita-katona-growth/', target: '_blank' }, text: 'LinkedIn \u2197' }
            }
          },

          ImageCol: {
            overflow: 'hidden',
            aspectRatio: '4/5',
            background: 'bgSubtle',
            '@tablet': { aspectRatio: '3/2' },
            Photo: {
              tag: 'img',
              attr: { src: `https:${IMG_BASE}/EP_130.jpg`, alt: 'Rita Katona', loading: 'lazy' },
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }
          }
        }
      }
    },

    StatsSection: {
      tag: 'section',
      background: 'lightGray',
      padding: '64px 0',
      Inner: {
        extends: 'Inner',
        Stats: { extends: 'StatsRow' }
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
      Inner: {
        extends: 'PageHeader.Inner',
        BackLink: { extends: 'BackLink', attr: { href: '/' }, text: '\u2190 Back' },
        Eyebrow:  { extends: 'Eyebrow', color: 'white22', text: 'Services' },
        Title:    { tag: 'h1', extends: 'H2', color: 'white', text: 'From Workshops to 1-on-1 Coaching' },
        Lead:     { extends: 'Lead', color: 'darkWhite35', maxWidth: 'none', margin: '20px auto 0', fontWeight: '300', text: "Let's elevate your startup's journey: I offer deep-dive sessions, practical workshops, and personalised coaching for business growth." }
      }
    },

    Workshops: {
      tag: 'section',
      background: 'white',
      padding: '96px 0',
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
      background: 'lightGray',
      padding: '96px 0',
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
      background: 'white',
      padding: '64px 0',
      Inner: {
        extends: 'Inner',
        textAlign: 'center',
        Label: { extends: 'Eyebrow', marginBottom: '16px', display: 'block', text: 'Often in cooperation with' },
        Chips: {
          extends: 'Flex',
          flexWrap: 'wrap',
          gap: '6px',
          justifyContent: 'center',
          marginTop: '16px',
          P1: { extends: 'Chip', text: 'Berlin Startup School' },
          P2: { extends: 'Chip', text: 'Startup Wise Guys' },
          P3: { extends: 'Chip', text: 'Berlin Innovation Agency' },
          P4: { extends: 'Chip', text: 'Swiss EP' }
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
      Inner: {
        extends: 'PageHeader.Inner',
        BackLink: { extends: 'BackLink', attr: { href: '/' }, text: '\u2190 Back' },
        Eyebrow:  { extends: 'Eyebrow', color: 'white22', text: 'Freelance Services' },
        Title:    { tag: 'h1', extends: 'H2', color: 'white', text: 'Hire me as a Freelancer' },
        Lead:     { extends: 'Lead', color: 'darkWhite35', maxWidth: 'none', margin: '20px auto 0', fontWeight: '300', text: 'Need hands-on, operative help with sales and marketing? I deliver impactful strategies and hands-on execution to level up your digital presence and drive meaningful engagement.' }
      }
    },

    Services: {
      tag: 'section',
      background: 'white',
      padding: '96px 0',
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
          fontWeight: '300',
          text: "I bring 12+ years of hands-on startup experience to every engagement. Whether you're looking to build your marketing foundation or scale existing efforts, I work as a true partner in your growth journey."
        },
        Grid: {
          extends: 'ItemsGrid',
          S1: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '01' }, Title: { extends: 'ServiceItemCard.Title', text: 'Digital Advertising & Social Media' }, Text: { extends: 'ServiceItemCard.Text', text: 'Selecting and setting up the most effective channels for your brand. Implementing overarching ad campaigns tailored to your objectives (Google, META, LinkedIn and more).' } },
          S2: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '02' }, Title: { extends: 'ServiceItemCard.Title', text: 'Content Strategy & Creation' }, Text: { extends: 'ServiceItemCard.Text', text: 'Crafting content plans informed by market trends and SEO research. Planning and overseeing content such as blogs, videos, and case studies. Managing and collaborating with third-party freelancers.' } },
          S3: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '03' }, Title: { extends: 'ServiceItemCard.Title', text: 'SEO Optimization' }, Text: { extends: 'ServiceItemCard.Text', text: 'Conducting comprehensive website and content reviews for SEO enhancement. Integrating targeted keywords and on-site optimization for better Google ranking. Improving technical SEO including page load speed and mobile optimization.' } },
          S4: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '04' }, Title: { extends: 'ServiceItemCard.Title', text: 'Sales & Marketing Strategy' }, Text: { extends: 'ServiceItemCard.Text', text: 'Developing full-scale sales and marketing strategies. Customising messaging and positioning for various target groups and use cases. Fostering lead generation, outreach, and communication tactics to drive growth.' } },
          S5: { extends: 'ServiceItemCard', Number: { extends: 'ServiceItemCard.Number', text: '05' }, Title: { extends: 'ServiceItemCard.Title', text: 'Interim CMO' }, Text: { extends: 'ServiceItemCard.Text', text: 'Planning, leading and executing all growth-related initiatives. Strategizing and testing various marketing channels for optimal reach. Hiring and mentoring team members to enhance capabilities. Push sales and marketing operations to accelerate business growth.' } }
        }
      }
    },

    CTA: {
      tag: 'section',
      background: 'lightGray',
      padding: '96px 0',
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
      Inner: {
        extends: 'PageHeader.Inner',
        BackLink: { extends: 'BackLink', attr: { href: '/' }, text: '\u2190 Back' },
        Eyebrow:  { extends: 'Eyebrow', color: 'white22', text: 'Social Proof' },
        Title:    { tag: 'h1', extends: 'H2', color: 'white', text: 'References & Partners' },
        Lead:     { extends: 'Lead', color: 'darkWhite35', maxWidth: 'none', margin: '20px auto 0', fontWeight: '300', text: 'See what partners say about our joint successes. These testimonials reflect the nature and great results of our collaborations.' }
      }
    },

    Testimonials: {
      tag: 'section',
      background: 'lightGray',
      padding: '96px 0',
      Inner: {
        extends: 'Inner',
        Grid: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'borderLight',
          '@tablet': { gridTemplateColumns: '1fr 1fr' },
          '@mobile': { gridTemplateColumns: '1fr' },

          T1: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"Our startup, Heynanny, has greatly benefited from Rita\'s expertise, especially in refining our go-to-market strategy. Her guidance on data analysis and tracking has been also pivotal in making more informed decisions. 100% recommended to startups looking into these areas!"' }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Julia Kahle' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'Co-Founder & CEO, Heynanny' } },
          T2: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"In the 4 years of working with Rita as a coach at Berlin Startup School, she has consistently delivered valuable workshops and 1on1 sessions on Digital Marketing, Go-to-Market & Sales strategies. Her insights and personalized coaching have greatly impacted our startup community, driving its growth."' }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Constantin Schmutzler' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'Founder & CEO, Berlin Startup School' } },
          T3: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"Rita\'s guidance was pivotal for refining our digital campaigns on Google and Meta platforms. She also helped precise tracking setup, and gave actionable insights on email and content strategies that boosted our engagement."' }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Tobias B\u00e4umler' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'Co-Founder & COO, VITAS.ai' } },
          T4: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"At Swiss EP, we value the authenticity and insights of entrepreneurs who have forged their own paths. Rita brought this to life at our latest Founders Retreat, where her expertise in sales was a great contribution to the advancement of our 14 participating teams."' }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Jakob Mod\u00e9er' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'Program Manager, Swiss Entrepreneurship Programme' } },
          T5: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"Her valuable insights in biz.dev, marketing, and sales have proven to be a great support for our startups\' growth, leading them to successfully test and prioritise growth channels. Her positive hands-on approach is well appreciated by our teams, putting her as one of our highest NPS-ranked coaches!"' }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Lou Kest' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'Project Manager, Berlin Innovation Agency' } },
          T6: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"Rita\'s three-year journey with our incubator has seen her guide many startups through their market introductions successfully. Her adept use of performance marketing on platforms like Google, LinkedIn, and META has also remarkably supported our corporate innovation projects."' }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Benjamin Bauer' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'CEO, ZOLLHOF Tech Incubator' } },
          T7: { extends: 'TestimonialCard', Quote: { extends: 'TestimonialCard.Quote', text: '"Sessions with Rita are often described as \'mind-opening\', \'insightful\', and \'direct and realistic\'. Her in-depth knowledge of the sector allows her to bring value to the table in no more than few minutes. She is definitely a mentor to keep close to you when it comes to tech startups."' }, AuthorName: { extends: 'TestimonialCard.AuthorName', text: 'Sergio Borasino' }, AuthorRole: { extends: 'TestimonialCard.AuthorRole', text: 'MD Founders Club, Startup Wise Guys' } }
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
      Inner: {
        extends: 'PageHeader.Inner',
        BackLink: { extends: 'BackLink', attr: { href: '/' }, text: '\u2190 Back' },
        Eyebrow:  { extends: 'Eyebrow', color: 'white22', text: 'Investment' },
        Title:    { tag: 'h1', extends: 'H2', color: 'white', text: 'Looking for Angel Investment?' },
        Lead:     { extends: 'Lead', color: 'darkWhite35', maxWidth: 'none', margin: '20px auto 0', fontWeight: '300', text: "As a proud member of the Wise Angels Network, I'm always on the lookout for tech startups to invest in." }
      }
    },

    Main: {
      tag: 'section',
      background: 'white',
      padding: '96px 0',
      Inner: {
        extends: 'Inner',

        WANBlock: {
          extends: 'Flex',
          background: 'white',
          padding: '40px',
          alignItems: 'center',
          gap: '32px',
          marginBottom: '64px',

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
              fontWeight: '300',
              text: "As an individual, but also as proud member of the Wise Angels Network, I'm always on the lookout for tech startups to invest in as well as offer my support on growth-related topics and beyond!"
            }
          }
        },

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

    WANInfo: {
      tag: 'section',
      background: 'lightGray',
      padding: '96px 0',
      Inner: {
        extends: 'Inner',
        Eyebrow: { extends: 'Eyebrow', text: 'About WAN' },
        Title:   { tag: 'h2', extends: 'H2', marginTop: '8px', text: 'Wise Angels Network' },
        Lead:    { extends: 'Lead', text: 'Wise Angels Network is an angel investor community headquartered in Europe, passionately committed to supporting startups during their critical early stages.' },
        Body:    { tag: 'p', color: 'medGray', fontSize: '15px', lineHeight: '1.75', maxWidth: '640px', marginTop: '8px', fontWeight: '300', text: 'Our mission goes beyond just financial backing; we aim to empower startup founders by offering invaluable guidance in areas such as marketing, sales, operations, and more.' },
        WANLink: { extends: 'CardLink', tag: 'a', display: 'inline-flex', marginTop: '16px', attr: { href: 'https://wiseangels.network', target: '_blank', rel: 'noopener' }, text: 'Learn more about WAN \u2192' }
      }
    },

    CTA: {
      tag: 'section',
      background: 'white',
      padding: '96px 0',
      Inner: {
        extends: 'Inner',
        textAlign: 'center',
        Title: { tag: 'h2', extends: 'H2', text: 'Ready to pitch your startup?' },
        Lead:  { extends: 'Lead', margin: '16px auto 32px auto', text: "If you think your startup meets the criteria, I'd love to hear from you." },
        Btn:   { tag: 'a', extends: 'BtnPrimary', attr: { href: '#contact' }, text: 'Get in touch' }
      }
    },

    Contact:    { extends: 'ContactSection' },
    SiteFooter: { extends: 'Footer' }
  }
}
