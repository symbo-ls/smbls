export const Progress = {
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
  extends: 'Flex',
  height: 'X',
  minWidth: 'F3',
  round: 'Y',
  overflow: 'hidden',
  '::-webkit-progress-bar': {
    '@dark': {
      background: 'gray',
    },
    '@light': {
      background: 'hurricane',
    },
  },
  '::-webkit-progress-value': {
    borderRadius: 'Y',
    theme: 'primary',
  },
};