export const UserStoryDone = {
  flow: 'y',
  align: 'center flex-start',
  gap: 'D',
  '@mobileM': {
    padding: 'F B1 E B1',
  },
  Hgroup: {
    align: 'center flex-start',
    textAlign: 'center',
    gap: 'A1',
    H: {
      text: 'User Story?',
      color: 'title',
      fontWeight: '100',
      tag: 'h1',
      '@mobileXS': {
        display: 'flex',
        flexFlow: 'column',
        gap: 'Y',
      },
      Strong: {
        text: ' boom, done!',
      },
    },
    P: {
      text: 'You have all the power to close tickets in minutes now. With help of AI and marketplace, you can drag and drop, prompt features and customize as you want.',
      fontSize: 'A2',
      fontWeight: '300',
      maxWidth: 'G3+B',
    },
  },
  Button: {
    extends: [
      'DocsLink',
      'Button',
    ],
    href: '/signup',
    text: 'Try it out',
    fontWeight: '700',
    theme: 'field',
    border: 'solid gray 1px',
    padding: 'Z1 D+Y2',
  },
};