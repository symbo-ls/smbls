export const RemainingLine = {
  gap: 'Z',
  align: 'center flex-start',
  position: 'relative',
  ':before': {
    content: '""',
    position: 'absolute',
    boxSize: 'C G2',
    background: 'linear-gradient(to right, var(--theme-document-dark-background) 0%, rgba(0, 0, 0, 0) 100%)',
  },
  minWidth: '100%',
  Flex: {
    align: 'center flex-start',
    width: '65%',
    onRender: (el, s) => {
      el.setProps({
        width: s.percent + '%'
      })
    },
    Line: {
      boxSize: '2px 100%',
      background: 'linear-gradient(to right, #0015FF, #0009FE)',
    },
    Dot: {
      boxSize: 'A2 A2',
      background: 'rgba(0, 9, 254, .35)',
      round: '100%',
      margin: '- - - -X',
      position: 'relative',
      ':after': {
        content: '""',
        boxSize: 'X1 X1',
        background: '#0085FE',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        round: '100%',
        opacity: '1',
        zIndex: '100',
      },
    },
  },
  Span: {
    text: '{{ percent }}% already raised',
    fontWeight: '300',
  },
};