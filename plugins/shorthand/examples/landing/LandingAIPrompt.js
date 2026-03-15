export const LandingAIPrompt = {
  flow: 'y',
  width: 'I2+D1',
  Box: {
    boxSize: 'E2 100%',
    minHeight: 'E2',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: 'line',
    borderWidth: '1px',
    position: 'relative',
    round: 'A2',
    Textarea: {
      minWidth: '100%',
      minHeight: '100%',
      maxHeight: '100%',
      theme: 'transparent',
      border: '0',
      borderWidth: '0',
      value: 'As an user, I need...',
      attr: {
        placeholder: '"As an user, I need..."',
      },
      padding: 'B - - B1',
      style: {
        borderWidth: '0',
      },
    },
    Flex: {
      position: 'absolute',
      top: 'A1',
      right: 'B1',
      gap: 'A2',
      childExtends: 'IconButton',
      childProps: {
        padding: 'X',
        theme: 'transparent',
      },
      children: [
        {
          Icon: {
            name: 'upload',
          },
        },
        {
          Icon: {
            name: 'chevronUp',
          },
        },
      ],
    },
    Button: {
      text: 'Create a feature',
      position: 'absolute',
      padding: 'Z2 C+X1',
      right: 'A1',
      bottom: 'A1',
      flow: 'row-reverse',
      gap: 'Y2',
      theme: 'blackWhite',
      fontWeight: '600',
      Icon: {
        name: 'chevronUp',
        fontSize: 'B',
        transform: 'rotate(45deg)',
        margin: '-W - - -',
      },
    },
  },
  Flex: {
    align: 'center space-between',
    padding: '- X',
    Button: {
      theme: 'transparent',
      padding: '0',
      text: 'Explore Marketplace',
      gap: 'X2',
      fontWeight: '500',
      color: 'title',
      Icon: {
        name: 'chevronUp',
        transform: 'rotate(45deg)',
        fontSize: 'B',
      },
    },
    Button_2: {
      theme: 'transparent',
      padding: '0',
      text: 'More Ideas',
      gap: 'W2',
      fontWeight: '400',
      margin: '- auto - B',
      Icon: {
        name: 'chevronDown',
        fontSize: 'B',
      },
    },
    P: {
      text: '* No black-box, you can build it once, and take to everywhere',
      fontWeight: '100',
    },
  },
};