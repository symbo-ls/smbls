export const SymbolsEditor = {
  flow: 'y',
  align: 'flex-start flex-start',
  minWidth: '320px',
  width: '100%',
  margin: '- auto',
  maxWidth: '1560px',
  maxHeight: '100%',
  gap: 'D',
  MakeDesignWithCode: {
    margin: '- auto',
  },
  Grid: {
    width: '100%',
    maxWidth: '100%',
    columns: 'repeat(3, 1fr)',
    childExtends: 'Box',
    margin: '0 auto',
    gap: 'B',
    padding: '- B',
    '@tabletL': {
      columns: 'repeat(2, 1fr)',
    },
    '@mobileL': {
      columns: '100%',
    },
    '@mobileS': {
      padding: '- A',
    },
    childProps: {
      height: 'G3+X',
      maxHeight: 'G3+X',
      position: 'relative',
      overflow: 'hidden',
      round: 'A',
      background: 'gray3 .3',
      Hgroup: {
        position: 'absolute',
        zIndex: '3',
        gap: 'Y',
        padding: '- B - -',
        H: {
          color: 'title',
          fontSize: 'A',
        },
        P: {
          color: 'caption',
        },
      },
      Img: {
        display: 'block',
        position: 'absolute',
        zIndex: '1',
      },
    },
    children: [
      {
        gridColumn: 'span 2',
        '@mobileL': {
          gridColumn: 'span 1',
        },
        Hgroup: {
          top: 'B',
          left: 'B',
          '@mobileS': {
            top: 'A2',
            left: 'A2',
          },
          H: {
            text: 'Voice and text input',
          },
          P: {
            text: 'AI processing using GPT-4, Claude, Grok and more',
          },
        },
        Img: {
          src: 'ai.svg',
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translate(-50%, 0)',
        },
        Download: {
          text: 'Download',
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'electricBlue',
          color: 'title',
          padding: 'Z B',
          round: 'D',
          pointerEvent: 'none',
          '@mobileS': {
            top: '42%',
            fontSize: 'Z1',
          },
        },
        Flex: {
          position: 'absolute',
          bottom: 'B',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%',
          maxWidth: '100%',
          align: 'center center',
          gap: 'A2',
          '@mobileL': {
            flow: 'y',
            bottom: 'B',
          },
          '@mobileM': {
            bottom: 'Y',
            gap: 'A',
          },
          IconText: {
            gap: 'Y',
            color: 'title',
            '@mobileM': {
              flow: 'y',
              gap: 'Y2',
              align: 'center flex-start',
              textAlign: 'center',
              padding: '- B',
              lineHeight: '1.3em',
            },
            '@mobileS': {
              fontSize: 'A2',
            },
            Icon: {
              name: 'microphone',
              fontSize: 'C',
            },
            text: '"Make this component wider, pink and add magic icon"',
            fontWeight: '500',
          },
          Button: {
            theme: 'transparent',
            padding: '0',
            text: 'Try it (soon)',
            color: 'title',
            fontWeight: '300',
            cursor: 'pointer',
          },
        },
      },
      {
        Hgroup: {
          bottom: 'B',
          left: 'B',
          '@mobileS': {
            bottom: 'A2',
            left: 'A2',
          },
          H: {
            text: 'Branding as Design System',
          },
          P: {
            text: 'Turn your branding into a system your apps use',
          },
        },
        Img: {
          src: 'designSystem.svg',
          width: '100%',
          top: 'B1',
          '@mobileL': {
            opacity: '.5',
          },
          '@mobileM': {
            opacity: '1',
          },
          '@mobileS': {
            top: 'C',
          },
        },
      },
      {
        Hgroup: {
          bottom: 'B',
          left: 'B',
          '@mobileS': {
            bottom: 'A2',
            left: 'A2',
          },
          H: {
            text: 'Version history',
          },
          P: {
            text: 'Time travel and individually compare your changes',
            '@screenS': {
              maxWidth: 'G',
            },
            '@mobileL': {
              maxWidth: 'fit-content',
            },
            '@mobileS': {
              maxWidth: 'F3',
            },
          },
        },
        Img: {
          src: 'versioning.svg',
          top: 'B2',
          right: 'B2',
          '@mobileS': {
            top: 'B1',
            right: 'B1',
          },
        },
      },
      {
        backgroundImage: 'scene.svg',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        gridColumn: 'span 2',
        '@mobileL': {
          gridColumn: 'span 1',
        },
        Hgroup: {
          top: 'B',
          left: 'B',
          '@mobileL': {
            top: 'A2',
            left: 'A2',
          },
          H: {
            text: 'Infinite Canvas',
          },
          P: {
            text: 'Put your resources in transparent and clear organization',
          },
        },
        Img: {
          src: 'canvas.svg',
          width: '100%',
          transform: 'scale(1.12)',
          top: 'E+A1',
          '@mobileL': {
            top: 'F',
          },
          '@mobileM': {
            top: 'F',
          },
        },
      },
      {
        Hgroup: {
          top: 'A2',
          left: 'B',
          '@mobileL': {
            top: 'A1',
            left: 'A',
          },
          H: {
            text: 'Customize without code',
          },
          P: {
            text: 'Online editor with and without coding changes',
          },
        },
        Img: {
          src: 'calculate.svg',
          top: 'E+Z',
          right: '-C',
          transform: 'scale(1.12)',
          '@mobileL': {
            transform: 'scale(1.3)',
            top: 'E3',
            right: '0',
          },
          '@mobileM': {
            transform: 'scale(1.2)',
            right: '-Z1',
          },
          '@mobileS': {
            transform: 'scale(1)',
            right: '-D1',
            top: 'E1',
          },
        },
      },
      {
        Hgroup: {
          top: 'A2',
          left: 'B',
          '@mobileL': {
            top: 'A1',
            left: 'A',
          },
          H: {
            text: 'Synchronisation',
          },
          P: {
            text: 'Get simultanious synchronisation to your local and to the live website',
            maxWidth: 'G1',
          },
        },
        Img: {
          src: 'rock.svg',
          top: 'E+A1',
          left: 'D1',
          '@screenS': {
            left: 'C2',
          },
          '@tabletL': {
            left: 'E2',
          },
          '@tabletM': {
            left: 'E',
          },
          '@tabletS': {
            left: 'C1',
          },
          '@mobileL': {
            left: 'E3',
          },
          '@mobileM': {
            left: 'D2',
          },
          '@mobileS': {
            left: '0',
            transform: 'scale(.8)',
          },
          '@mobileXS': {
            left: '-B1',
          },
        },
      },
      {
        Hgroup: {
          bottom: 'B',
          left: 'B',
          '@mobileL': {
            bottom: 'A2',
            left: 'A2',
          },
          H: {
            text: 'Cross Delivery',
          },
          P: {
            text: 'Universal by design, we support the most popular frameworks and tools to get your onboard faster',
            maxWidth: 'G2',
          },
        },
        ':after': {
          content: '""',
          position: 'absolute',
          boxSize: '100% 100%',
          zIndex: '2',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        },
        Img: {
          src: 'platforms.svg',
          top: 'B',
          left: 'B',
          '@mobileL': {
            transform: 'scale(1.2)',
            top: 'D',
            left: 'E',
          },
          '@mobileM': {
            transform: 'scale(1)',
            top: 'B',
            left: 'B',
          },
        },
      },
    ],
  },
};