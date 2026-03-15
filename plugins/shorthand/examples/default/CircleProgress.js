export const CircleProgress = {
  tag: 'progress',
  attr: {
    max: ({
      props
    }) => props.max,
    progress: ({
      props
    }) => props.progress,
    value: ({
      props
    }) => props.value,
  },
  boxSize: 'D D',
  value: 0.73,
  round: '100%',
  overflow: 'hidden',
  position: 'relative',
  '&::-webkit-progress-bar': {
    background: 'gray',
  },
  '&::-webkit-progress-value': {
    theme: 'primary',
  },
  ':after': {
    content: '""',
    position: 'absolute',
    width: 'B+B2',
    height: 'B+B2',
    round: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'codGray',
  },
};