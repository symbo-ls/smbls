export const Feedbacks = {
  flow: 'y',
  gap: 'E',
  boxSizing: 'content-box',
  position: 'relative',
  align: 'center flex-start',
  minHeight: 'fit-content',
  maxWidth: '100%',
  '@tabletS': {
    overflow: 'hidden',
  },
  '@mobileM': {
    gap: 'D1',
  },
  ':before': {
    content: '""',
    boxSize: '100% B2',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '2',
    pointerEvents: 'none',
    background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    display: 'none',
    '@tabletS': {
      display: 'block',
    },
  },
  ':after': {
    content: '""',
    boxSize: '100% D1',
    position: 'absolute',
    top: '0',
    right: '-X',
    pointerEvents: 'none',
    zIndex: '2',
    background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    display: 'none',
    '@tabletS': {
      display: 'block',
    },
  },
  '@dark': {
    ':after': {
      background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)',
    },
  },
  '@light': {
    background: 'gray15',
    color: 'gray1',
    ':after': {
      background: 'linear-gradient(to top, rgba(241, 241, 243, 1) 0%,rgba(241, 241, 243, 0) 100%)',
    },
  },
  Hgroup: {
    align: 'center flex-start',
    gap: 'A2',
    H: {
      '@mobileM': {
        padding: '- B1',
        textAlign: 'center',
        lineHeight: '1.3em',
      },
      ':before, &:after': {
        content: `'"'`,
        fontWeight: '400',
      },
      text: 'This feels like a magical software',
      fontSize: 'E2',
      color: 'title',
    },
    P: {
      textAlign: 'center',
      text: '- Mike Minciotti',
      color: 'title',
      fontWeight: '700',
      Div: {
        fontWeight: '300',
        text: 'Agency founder',
      },
    },
  },
  Grid: {
    maxWidth: '100%',
    margin: '- auto',
    columns: 'repeat(3, 1fr)',
    gap: 'F G',
    '@screenL': {
      gap: 'F2',
      fontSize: 'A2',
    },
    '@screenM': {
      gap: 'F1',
      fontSize: 'A1',
    },
    '@tabletM': {
      columns: 'repeat(2, 1fr)',
      gap: 'E',
    },
    '@tabletS': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      maxWidth: '100%',
      overflowX: 'auto',
      padding: '- B2',
      gap: 'D1',
      '::-webkit-scrollbar': {
        display: 'none',
      },
    },
    '@mobileM': {
      gap: 'C',
      padding: '- B',
    },
    position: 'relative',
    childExtends: 'UserFeedBack',
    children: [
      {
        transform: 'translateX(100px)',
        '@tabletM': {
          transform: 'translateX(0px)',
        },
        '@tabletS': {
          transform: 'translate(0px, 0px)',
        },
      },
      {
        transform: 'translate(-30px, 105px)',
        '@tabletM': {
          transform: 'translate(0, 70px)',
        },
        '@tabletS': {
          transform: 'translate(0px, 0px)',
        },
        Avatar: {
          src: 'arthur.svg',
        },
        Flex: {
          Strong: {
            text: 'Arthur Beckett',
          },
          Caption: {
            text: 'Full Stack Developer',
          },
          P: {
            text: 'This would defintely streamline the process for my web dev agency.',
          },
        },
      },
      {
        transform: 'translate(-200px, -54px)',
        '@tabletM': {
          transform: 'translate(50px, 0px)',
        },
        '@tabletS': {
          transform: 'translate(0px, 0px)',
        },
        Avatar: {
          src: 'joe.svg',
        },
        Flex: {
          Strong: {
            text: 'Joe Mallory-Skinner',
          },
          Caption: {
            text: 'Design System Designer',
          },
          P: {
            text: 'This would defintely streamline the process for my web dev agency.',
          },
        },
      },
      {
        transform: 'translate(130px, -50px)',
        '@tabletM': {
          transform: 'translate(100px, 50px)',
        },
        '@tabletS': {
          transform: 'translate(0px, 0px)',
        },
        Avatar: {
          src: 'mike.svg',
        },
        Flex: {
          Strong: {
            text: 'Mike Minciotti',
          },
          Caption: {
            text: 'Agency Owner',
          },
          P: {
            text: 'What you guys have built is really cool. I definitely see a use for this.',
          },
        },
      },
      {
        transform: 'translate(60px, -24px)',
        '@tabletM': {
          transform: 'translate(-50px, 30px)',
        },
        '@tabletS': {
          transform: 'translate(0px, 0px)',
        },
        Avatar: {
          src: 'derek.svg',
        },
        Flex: {
          Strong: {
            text: 'Derek Onay',
          },
          Caption: {
            text: 'Senior Product Designer',
          },
          P: {
            text: 'Symbols is definitely more advanced than Storybook',
          },
        },
      },
      {
        transform: 'translate(-110px, -170px)',
        '@tabletM': {
          transform: 'translate(0, -10px)',
        },
        '@tabletS': {
          transform: 'translate(0px, 0px)',
        },
        Avatar: {
          src: 'aaron.svg',
        },
        Flex: {
          Strong: {
            text: 'Aaron Fagan',
          },
          Caption: {
            text: 'Enterprise Architect',
          },
          P: {
            text: 'Symbols is miles ahead of what my company uses to manage UIkits',
          },
        },
      },
      {
        transform: 'translate(100px, -50px)',
        '@tabletM': {
          transform: 'translate(0px, 0)',
        },
        '@tabletS': {
          transform: 'translate(0px, 0px)',
        },
        Avatar: {
          src: 'matt.svg',
        },
        Flex: {
          Strong: {
            text: 'Matt Vaccaro',
          },
          Caption: {
            text: 'Product Engineer',
          },
          P: {
            text: 'I just watched the video, really like the execution of the idea! Its what Storybook should have been.',
          },
        },
      },
      {
        transform: 'translate(-20px, -135px)',
        '@tabletM': {
          transform: 'translate(70px, -30px)',
        },
        '@tabletS': {
          transform: 'translate(0px, 0px)',
        },
        Avatar: {
          src: 'chirag.svg',
        },
        Flex: {
          Strong: {
            text: 'Chirag Thesia',
          },
          Caption: {
            text: 'Software Engineer',
          },
          P: {
            text: '👍  Great product. I will for sure be a customr. Also excited to see where you guys take it.',
          },
        },
      },
      {
        transform: 'translate(-100px, -230px)',
        '@tabletM': {
          transform: 'translate(0, 0)',
        },
        '@tabletS': {
          transform: 'translate(0px, 0px)',
        },
        Avatar: {
          src: 'enes.svg',
        },
        Flex: {
          Strong: {
            text: 'Enes Tufekci',
          },
          Caption: {
            text: 'Owner of UIAgents',
          },
          P: {
            text: 'I’m very impressed with the overall product. Very useful.',
          },
        },
      },
      {
        position: 'absolute',
        right: 'E1',
        bottom: '-C',
        '@tabletM': {
          position: 'initial',
          transform: 'translate(30px, -30px)',
          right: 'initial',
          bottom: 'initial',
        },
        '@tabletS': {
          transform: 'translate(0px, 0px)',
        },
        Avatar: {
          src: 'andrew.svg',
        },
        Flex: {
          Strong: {
            text: 'Andrew Smith',
          },
          Caption: {
            text: 'Product Director',
          },
          P: {
            text: 'It looks like it will solve the big issue with tech stack fragmentation.',
          },
        },
      },
    ],
    '@screenS': {
      fontSize: 'A',
    },
  },
};