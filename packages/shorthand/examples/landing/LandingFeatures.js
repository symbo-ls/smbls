export const LandingFeatures = {
  width: 'I2+D1',
  flow: 'y',
  gap: 'X',
  round: 'A',
  padding: 'X',
  borderColor: 'line',
  borderStyle: 'solid',
  borderWidth: '1px',
  onClick: (ev, el, s) => {
    if (s.isVisible)
      el.node.scrollIntoView()
  },
  state: {
    src: 'https://framerusercontent.com/assets/AxeBFuMTUKWY0EUAoFYNtp3KbaI.mp4?',
  },
  Grid: {
    columns: 'repeat(4, 1fr)',
    childExtends: [
      'Flex',
      'CanvasButton',
    ],
    gap: '0 W2',
    childProps: {
      fontSize: 'Z2',
      round: 'Z2',
      align: 'center',
      padding: 'Z2 A2',
      gap: 'Z',
      flex: 1,
      isActive: (el, s) => el.props.src === s.src,
      Text: {
        text: '{{ text }}',
      },
      onClick: (ev, el, s) => {
        const isSame = el.props.src === s.src
        s.update({
          isVisible: !isSame,
          src: el.props.src
        })
      },
    },
    children: [
      {
        src: 'https://framerusercontent.com/assets/AxeBFuMTUKWY0EUAoFYNtp3KbaI.mp4',
        text: 'Agentic development',
      },
      {
        src: 'https://framerusercontent.com/assets/pDhE8bhHJyPeMn94gyvjz62F94.mp4',
        text: 'Drag-and-drop features',
      },
      {
        text: 'Connect to your local IDE',
      },
      {
        text: 'Publish to domain',
      },
      {
        text: 'Present before saving',
      },
      {
        text: 'Two-click 3rd party integrations',
      },
      {
        text: 'Share in realtime sandbox isolation',
      },
      {
        text: 'Rewind changes instantly',
      },
    ],
  },
  Box: {
    theme: 'dialog',
    round: 'A',
    overflow: 'hidden',
    transition: 'C1 defaultBezier height',
    padding: 'Y',
    position: 'relative',
    '.isVisible': {
      height: 'H3',
    },
    '!isVisible': {
      height: 'F1',
    },
    onRender: el => {
      window.requestAnimationFrame(() => {
        const height = el.Video.node.scrollHeight
        el.props['.isVisible'].height = height + 16
      })
    },
    onClick: (ev, el, s) => {
      if (!s.isVisible) s.toggle('isVisible')
    },
    '@dark': {
      color: 'white',
      backgroundColor: 'gray4 .9',
    },
    '@light': {
      color: 'black',
      backgroundColor: 'gray13 .95',
    },
    Video: {
      src: '{{ src }}',
      width: '100%',
      zIndex: '2',
      round: 'Z2',
      aspectRatio: '11 / 7',
      objectFit: 'cover',
      autoplay: false,
      controls: false,
      loop: true,
      onMouseenter: (ev, el) => {
        el.node.play()
      },
      onMouseleave: (ev, el) => {
        el.node.pause()
      },
    },
    ':after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      boxSize: '50% 100%',
      zIndex: '2',
      background: 'linear-gradient(to top, var(--theme-document-dark-background) 0%, rgba(0, 0, 0, 0) 100%)',
      transition: 'Z defaultBezier',
      transitionProperty: 'opacity, transform',
      pointerEvents: 'none',
    },
  },
};