export const CreateFeatureItem = {
  flow: 'y',
  align: 'flex-start flex-start',
  Img: {
    src: 'comps.svg',
    boxSize: 'E2 F2',
    margin: '- - C -',
  },
  Hgroup: {
    gap: 'A',
    H: {
      text: '',
      fontSize: 'E1',
      maxWidth: 'F',
      lineHeight: '1.3em',
      color: 'title',
      Span: {
        text: 'Access',
        fontWeight: '300',
      },
      Span_2: {
        text: ' 3000+ features',
      },
      Span_3: {
        text: ', or ',
        fontWeight: '300',
      },
      Span_4: {
        text: 'generate with AI',
      },
    },
    P: {
      text: 'Invite team members, share and collaborate all-in-one realtime canvas',
      fontSize: 'A2+X',
      fontWeight: '100',
      maxWidth: 'G+B2',
      color: 'title',
    },
  },
  Button: {
    extends: [
      'DocsLink',
      'Button',
    ],
    href: '/signup',
    text: 'Create features',
    fontWeight: '700',
    flow: 'row-reverse',
    align: 'center center',
    gap: 'A2',
    padding: 'Z2 -',
    minWidth: 'F3+B2',
    maxWidth: 'F3+B2',
    theme: null,
    color: 'highlight-reversed',
    background: 'highlight',
    margin: 'E - - -',
    Icon: {
      name: 'chevronUp',
      fontSize: 'B',
      transform: 'rotate(45deg)',
      margin: '-W - - -',
    },
    border: '0',
  },
  P: {
    text: '* Learning, creating and sharing is free of charge',
    fontWeight: '100',
    margin: 'B2 - - -',
  },
};