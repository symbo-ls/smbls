export const FeatureItem = {
  extends: 'Link',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'line',
  position: 'relative',
  widthRange: 'G1',
  transition: 'A defaultBezier',
  transitionProperty: 'color, background, border',
  padding: 'F1 B1 C1',
  round: 'B2',
  '@mobileS': {
    style: {
      minWidth: '100% !important',
      maxWidth: '100% !important',
      scrollSnapAlign: 'start',
    },
  },
  ':hover': {
    color: 'title',
    borderColor: 'line-highlight',
    '& span': {
      color: 'highlight .9',
    },
  },
  H3: {
    transition: 'A defaultBezier color',
    fontWeight: '700',
    color: 'title',
    fontSize: 'A2+X',
    Span: {
      transition: 'A defaultBezier color',
      fontWeight: '100',
    },
  },
  Icon: {
    position: 'absolute',
    fontSize: 'D1',
    top: 'A1',
    left: 'A1',
  },
};