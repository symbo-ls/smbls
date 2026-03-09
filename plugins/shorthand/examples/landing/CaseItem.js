export const CaseItem = {
  extend: [
    'Link',
    'Flex',
  ],
  props: {
    gap: 'B2',
    cursor: 'pointer',
    ':hover': {
      '> div > div': {
        opacity: '1',
      },
      '> div > div:after': {
        width: '75%',
        opacity: '1',
      },
      '> div > div > svg': {
        transform: 'rotate(90deg)',
      },
    },
  },
  Img: {
    src: 'bitmap.svg',
    boxSize: 'F2 G1',
    objectFit: 'fill',
  },
  Flex: {
    flow: 'y',
    align: 'flex-start space-between',
    padding: 'Z -',
    H2: {
      text: 'How did BCW improve infra and management reporting in just 3 days',
      fontWeight: '100',
      fontSize: 'B2+X1',
      minWidth: 'F+B',
      maxWidth: 'F+B',
      lineHeight: '1.3em',
      color: 'title',
    },
    IconText: {
      align: 'center flex-start',
      fontSize: 'A1',
      fontWeight: '100',
      gap: 'Y2',
      position: 'relative',
      maxWidth: 'fit-content',
      padding: '- - X2 -',
      opacity: '.8',
      Icon: {
        name: 'chevronUp',
        transition: 'transform .5s ease',
        transform: 'rotate(45deg)',
      },
      text: 'Read more',
      ':after': {
        content: '""',
        height: '.5px',
        width: '0',
        opacity: '0',
        transition: 'width .3s ease, opacity .5s ease',
        background: 'white .75',
        position: 'absolute',
        bottom: '0',
        left: 'B-V',
      },
    },
  },
};