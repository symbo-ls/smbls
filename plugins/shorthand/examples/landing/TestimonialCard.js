export const TestimonialCard = {
  flow: 'y',
  gap: 'Z2',
  padding: 'A B',
  minWidth: 'G',
  maxWidth: 'G',
  round: 'A',
  theme: 'field',
  transition: 'A defaultBezier opacity',
  '@mobileL': {
    minWidth: '85vw',
    maxWidth: '85vw',
    style: {
      scrollSnapAlign: 'start'
    }
  },

  P: {
    text: '',
    color: 'title',
    margin: '0',
    lineHeight: '1.5',
    fontWeight: '400',
    fontSize: 'Z1'
  },

  Flex: {
    flow: 'x',
    gap: 'Z1',
    align: 'center flex-start',
    margin: 'Y1 - - -',

    Avatar: {
      src: 'james.svg',
      boxSize: 'B2 B2'
    },

    Flex_2: {
      align: 'start',
      flow: 'y',
      gap: '0',

      Strong: {
        text: '',
        color: 'title',
        fontSize: 'Z1',
        fontWeight: '600'
      },

      Caption: {
        text: '',
        fontSize: 'Z',
        fontWeight: '300',
        color: 'caption'
      }
    }
  }
}
