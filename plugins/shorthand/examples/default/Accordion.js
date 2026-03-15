export const Accordion = {
  state: {
    activeAccordion: false,
  },
  ButtonParagraph: {
    cursor: 'pointer',
    gap: 'D1',
    onClick: (event, element, state) => {
      state.update({
        activeAccordion: !state.activeAccordion
      })

    },
    P: {
      text: 'Question text one here',
    },
    Button: {
      text: '',
      Icon: {
        name: 'chevronDown',
        '.activeAccordion': {
          transform: 'rotate(-180deg)',
        },
        transition: 'transform .3s ease',
      },
    },
  },
  P: {
    text: 'Use a checkbox when users can select one option, multiple options, or no option from a list of a possible options',
    margin: '0',
    maxWidth: 'H',
    minWidth: 'H',
    position: 'absolute',
    left: '0',
    top: '2em',
    transition: 'min-height .3s ease, max-height .3s ease, opacity .3s ease',
    overflow: 'hidden',
    '.activeAccordion': {
      minHeight: '4em',
      maxHeight: '10em',
      opacity: '1',
    },
    '!activeAccordion': {
      minHeight: '0',
      maxHeight: '0',
      opacity: '0',
    },
  },
  extends: 'Flex',
  flow: 'y',
  gap: 'Y2',
  position: 'relative',
};