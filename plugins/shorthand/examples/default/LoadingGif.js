export const LoadingGif = {
  extends: 'Img',
  src: 'https://assets.symbo.ls/loading.gif',
  width: '3.2em',
  pointerEvents: 'none',
  opacity: '.35',
  zIndex: '-1',
  inCenter: true,
  '.inCenter': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate3d(-50%, -50%, 0)',
  },
};