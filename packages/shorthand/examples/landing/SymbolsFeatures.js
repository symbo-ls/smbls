export const SymbolsFeatures = {
  maxWidth: '100%',
  border: '1px solid transparent',
  padding: '0 !important',
  P: {
    fontSize: 'A2+X',
    textAlign: 'center',
    maxWidth: 'H+C',
    text: 'Whatever you create in Symbols',
    fontWeight: '700',
    padding: 'D2 -',
    color: 'title',
    margin: '- auto',
    Span: {
      text: ', can all be fully exported away from the platform with the source code. Giving you absolute peace of mind for whatever you build, you fully own.',
      fontWeight: '100',
    },
    '@tabletS': {
      padding: 'D2 B1',
    },
    '@mobileL': {
      fontSize: 'B2',
    },
  },
  Scrollable: {
    maxWidth: '100%',
    overflowX: 'auto',
    gap: 'B2',
    padding: '- B A B',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    align: 'start',
    '@tabletS': {
      padding: 'B',
    },
    '@mobileS': {
      gap: 'B1',
      padding: 'A1',
      style: {
        scrollSnapType: 'x mandatory',
      },
      scrollPadding: 'A1',
    },
    childProps: {
      '@mobileS': {
        padding: 'E2 B B B',
      },
      Icon: {},
      H3: {
        '@mobileS': {
          fontSize: 'D2',
        },
      },
    },
    childExtends: 'FeatureItem',
    children: [
      {
        href: '/docs/components',
        ':hover': {
          background: '#1E2397',
        },
        Icon: {
          name: 'grid',
        },
        H3: {
          text: 'Building reusable cloud components',
          Span: {
            text: ' with cross-framework distribution.',
          },
        },
      },
      {
        href: '/docs/design-system',
        ':hover': {
          background: '#FFF263',
          color: 'highlight-reversed',
          '& h3': {
            color: 'highlight-reversed',
          },
          '& span': {
            color: 'highlight-reversed',
          },
        },
        Icon: {
          name: 'tree',
        },
        H3: {
          text: 'Advanced design system ',
          Span: {
            text: ' for multi-branded websites and cross-device support, including TVs.',
          },
        },
      },
      {
        href: '/docs/functions',
        ':hover': {
          background: '#5FCCD6',
          color: 'highlight-reversed',
          '& h3': {
            color: 'highlight-reversed',
          },
          '& span': {
            color: 'highlight-reversed',
          },
        },
        Icon: {
          name: 'fn outline',
        },
        H3: {
          text: 'Frontend functions and dependencies ',
          Span: {
            text: 'reusable across projects and domains. Built on cloud, delegated using API.',
          },
        },
      },
      {
        href: '/docs/files',
        ':hover': {
          background: '#2127A7',
        },
        Icon: {
          name: 'folder outline',
        },
        H3: {
          text: 'Files and assets on the cloud - ',
          Span: {
            text: 'instant access in the code, no assets sharing anymore!',
          },
          padding: '- V2+V2 - -',
        },
      },
      {
        ':hover': {
          color: 'title-reversed',
          background: '#FFFFFF',
          '& h3': {
            color: 'title-reversed',
          },
          '& span': {
            color: 'title-reversed .9',
          },
        },
        Icon: {
          name: 'state',
        },
        H3: {
          text: 'Content and state management - in one',
          Span: {
            text: ' CMS unifies content and state driven flows into one dashboard.',
          },
          padding: '- W - -',
        },
      },
      {
        href: '/docs/pages',
        ':hover': {
          background: '#A823F6',
        },
        Icon: {
          name: 'content',
        },
        H3: {
          text: 'SEO-friendly pages and flows',
          Span: {
            text: ' including backend rendered markup and multi-level routing.',
          },
        },
      },
      {
        href: '/docs/testing',
        ':hover': {
          background: '#BC0025',
        },
        Icon: {
          name: 'bug',
        },
        H3: {
          text: 'Visual testing',
          Span: {
            text: ' - environment to visually test screens across devices, covering any kind of E2E tests.',
          },
        },
      },
      {
        href: '/docs/framework',
        ':hover': {
          background: 'line',
        },
        Icon: {
          name: 'api',
        },
        H3: {
          text: 'Symbols is an ecosystem ',
          Span: {
            text: ' single source of truth to build frontend locally and in cloud - in realtime.',
            display: 'block',
          },
        },
      },
    ],
  },
  Scrollbar: {
    extends: 'Scrollbar.scrollable',
    maxWidth: '95%',
    minWidth: '95%',
    margin: '- auto',
    '@mobileS': {
      maxWidth: '88%',
      minWidth: '88%',
    },
  },
};