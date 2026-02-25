export const CreateFeature = {
  flow: 'x',
  minWidth: '320px',
  maxWidth: '1560px',
  position: 'relative',
  margin: '- auto',
  width: '100%',
  alignSelf: 'flex-start',
  padding: '- - E -',
  Flex: {
    flow: 'y',
    minWidth: '50%',
    childProps: {
      padding: 'D2 - D2 D2',
      boxSizing: 'border-box',
      position: 'relative',
      '@mobileL': {
        padding: 'D',
      },
      '@mobileM': {
        padding: 'C B C B',
      },
      ':before': {
        content: '""',
        boxSize: '1px 200%',
        position: 'absolute',
        top: '0',
        left: '0',
        background: 'line',
        zIndex: '0',
      },
      ':last-child': {
        ':after': {
          content: '""',
          boxSize: '1px 200%',
          position: 'absolute',
          bottom: '0',
          left: '0',
          background: 'line',
          zIndex: '0',
        },
      },
      Img: {},
      Hgroup: {
        '@mobileS': {
          fontSize: 'Z1',
        },
      },
      Button: {
        '@mobileXS': {
          minWidth: '100%',
          maxWidth: '100%',
        },
      },
    },
    childExtends: 'CreateFeatureItem',
    children: [
      {},
      {
        Img: {
          src: 'users.svg',
        },
        Hgroup: {
          H: {
            maxWidth: 'F',
            Span: {
              text: 'Turn team work into',
            },
            Span_2: {
              text: ' features, pages, apps',
            },
            Span_3: null,
            Span_4: null,
          },
          P: {},
        },
        Button: {
          text: 'Start creating features',
        },
        P: {},
      },
      {
        Img: {
          src: 'rebrand.webp',
        },
        Hgroup: {
          H: {
            maxWidth: 'F',
            Span: {
              text: 'Rebrand easily, export and publish',
              fontWeight: '700',
            },
            Span_2: null,
            Span_3: null,
            Span_4: null,
          },
          P: {},
        },
        Button: {
          text: 'Start creating features',
        },
      },
    ],
  },
  Box: {
    extends: 'Flex',
    align: 'center center',
    boxSize: 'H2 50%',
    minHeight: 'H2',
    position: 'sticky',
    left: '0',
    top: '50%',
    right: '0',
    zIndex: '5',
    '@tabletS': {
      display: 'none',
    },
    Img: {
      objectFit: 'scale-down',
      boxSize: '100%',
      src: 'landing.gif',
    },
    onRender: (el) => {
      const top = el.call('getCenteredTopOffset')
      el.setProps({
        top: top / 2
      })
    },
  },
};