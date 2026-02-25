export const StoryCard = {
  Img: {
    src: 'https://files-production-symbols-platform-development-en-d5-u3-p7x0.based.dev/fibd6dc13e/64be440c-ae12-4942-8da7-d772e06cb76c-b3013bf0-701c-4aff-b439-55d412265b2a-25215bc5-652d-40a7-8c99-af865865b74e.jpeg',
    boxSize: '100%',
    zIndex: '2',
    round: 'A',
  },
  Icon: {
    icon: 'smile',
    position: 'absolute',
    zIndex: '2',
    top: '35%',
    left: '50%',
    fontSize: 'J1+F1',
    transform: 'translate(-50%, -50%)',
    color: 'white',
  },
  HgroupSteps: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    zIndex: '2',
    minWidth: '100%',
    maxWidth: '100%',
    round: '0',
    padding: 'B1',
    theme: 'field',
    Hgroup: {
      H: {
        text: 'Symbols',
      },
      P: {
        color: 'white .65',
      },
    },
    ProgressStepSet: {
      childProps: {
        theme: 'field-dialog',
      },
      children: () => [{}, {}],
    },
  },
  extends: 'Flex',
  position: 'relative',
  round: 'B2',
  boxSize: 'H1 G3',
  alignSelf: 'flex-start',
  overflow: 'hidden',
};