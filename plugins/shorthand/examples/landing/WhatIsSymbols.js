export const WhatIsSymbols = {
  flow: 'y',
  align: 'center center',
  gap: 'B2',
  H2: {
    textAlign: 'center',
    margin: '- auto A',
    color: 'title',
    text: null,
    lineHeight: '1.3em',
    Strong: {
      text: 'Industry leading benefits',
    },
    Text: {
      fontWeight: '100',
      text: 'Game changing ways of building features',
    },
  },
  Grid: {
    gap: 'A',
    margin: '0 auto',
    align: 'center center',
    templateColumns: 'repeat(3, 1fr)',
    '@tabletM': {
      templateColumns: 'repeat(2, 1fr)',
    },
    '@mobileL': {
      templateColumns: 'repeat(1, 1fr)',
    },
    childExtends: 'Flex',
    childProps: {
      position: 'relative',
      flow: 'y',
      flex: 1,
      ':hover': {
        '& h5, &:after': {
          opacity: 0,
          transform: 'translate3d(0, 35%, 0)',
        },
      },
      Video: {
        src: '{{ src }}',
        width: '100%',
        zIndex: '2',
        round: 'A',
        aspectRatio: '11 / 7',
        objectFit: 'cover',
        autoplay: false,
        controls: false,
        loop: true,
        onMouseenter: (ev, el) => {
          el.node.play()
        },
        onMouseleave: (ev, el) => {
          el.node.pause()
        },
      },
      ':after': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        boxSize: '50% 100%',
        zIndex: '2',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        transition: 'Z defaultBezier',
        transitionProperty: 'opacity, transform',
        pointerEvents: 'none',
      },
      H5: {
        position: 'absolute',
        bottom: '0',
        width: '90%',
        color: 'title',
        fontWeight: 'bold',
        zIndex: '3',
        padding: 'A',
        text: '{{ text }}',
        transition: 'Z defaultBezier',
        transitionProperty: 'opacity, transform',
        pointerEvents: 'none',
      },
    },
    childrenAs: 'state',
    children: [
      {
        src: 'https://framerusercontent.com/assets/AxeBFuMTUKWY0EUAoFYNtp3KbaI.mp4',
        text: 'Build infinitely. With infinite possibilities',
      },
      {
        src: 'https://framerusercontent.com/assets/g40v2j6gQHNy81TmYS2jWmTP2yI.mp4',
        text: 'Build apps, websites, tools, dashboards—visually or in code.',
      },
      {
        src: 'https://framerusercontent.com/assets/y37VYVYGJsvMeQl181rP9AA17Hs.mp4',
        text: 'Reusable components rendered to React, email, PDF, TV all at once',
      },
      {
        src: 'https://framerusercontent.com/assets/pDhE8bhHJyPeMn94gyvjz62F94.mp4',
        text: 'Test your UI kit. Gain reassurance. ',
      },
      {
        src: 'https://framerusercontent.com/assets/UctQMqXDGpt2mDjYj9lTXvT0hbQ.mov',
        text: 'Document for consistency. Unify your design system.',
      },
      {
        src: 'https://framerusercontent.com/assets/mQtIYUDHDQaFBgosfuigjoL6Psk.mp4',
        text: 'Publish as a website. Or export to your existing tech stack.',
      },
    ],
  },
};