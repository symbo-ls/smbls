import { create } from '@domql/element'

// Minimal component definitions matching the developers page structure
const SceneTemplate = {
  props: {
    display: 'flex',
    borderRadius: 'A',
    padding: 'A',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  }
}

const StandaloneMonaco = {
  props: {
    transition: 'opacity B defaultBezier',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  data: {},
}

const Monaco = {
  extend: StandaloneMonaco,
  props: {
    flex: 1,
    position: 'relative',
    foldLevel: 2,
    opacity: 1,
    fileTab: {
      code: 'export default {}',
      type: 'javascript',
      filename: 'app.js',
    },
  }
}

const CodePreviewWidget = {
  display: 'flex',
  flow: 'column',
  position: 'sticky',
  top: '0',
  order: 0,
  Monaco
}

const Scene = {
  extend: SceneTemplate,
  props: {
    margin: '- auto',
    boxSize: '100%',
    action: 'recreate',
  },
  Iframe: {
    srcdoc: '',
    position: 'absolute',
    round: 'Z2',
    inset: '0 0 0 0',
    width: '100%',
    height: '100%',
    border: '0',
    loading: 'lazy',
  },
}

const MonacoWithScene = {
  extend: 'Flex',
  props: {
    height: '100%',
    gap: 'A2',
    width: '100%',
    align: 'stretch center',
  },
  CodePreviewWidget: {
    margin: '- - - -A',
    flex: '1',
    round: 'X2',
    padding: 'X2 X2 X2 -',
    minHeight: 'G1',
    height: '100%',
    position: 'relative',
    Monaco: {
      readOnly: false,
      foldLevel: false,
      opacity: 1,
    },
  },
  Scene: {
    boxSize: 'auto',
    action: 'recreate',
    useLibrary: false,
    flex: '1',
    Iframe: {
      minHeight: '100%',
    },
  },
}

const CanvasEmbed = {
  tag: 'iframe',
  minWidth: 'none',
  minHeight: 'none',
  border: 'none',
  width: '100%',
  height: 'H2',
  round: 'Z2',
}

// Components registry
const components = {
  Flex: { tag: 'div' },
  SceneTemplate,
  StandaloneMonaco,
  CodePreviewWidget,
  Scene,
  MonacoWithScene,
  CanvasEmbed,
}

const context = {
  components,
  pages: {},
  define: {},
}

describe('/developers page DOMQL rendering', () => {
  jest.setTimeout(10000) // 10 second timeout to catch infinite loops

  test('MonacoWithScene should not cause infinite loop', () => {
    const element = {
      extend: 'Flex',
      props: {
        height: '100%',
        gap: 'A2',
        width: '100%',
      },
      CodePreviewWidget: {
        margin: '- - - -A',
        flex: '1',
        Monaco: {
          readOnly: false,
          opacity: 1,
        },
      },
      Scene: {
        boxSize: 'auto',
        action: 'recreate',
        flex: '1',
        Iframe: {
          minHeight: '100%',
        },
      },
    }

    const result = create(element, {}, 'MonacoWithScene', { context })
    expect(result).toBeDefined()
    expect(result.key).toBe('MonacoWithScene')
  })

  test('Scene with Iframe should not cause infinite loop', () => {
    const element = {
      extend: SceneTemplate,
      props: {
        margin: '- auto',
        boxSize: '100%',
        action: 'recreate',
      },
      Iframe: {
        srcdoc: '',
        position: 'absolute',
        width: '100%',
        height: '100%',
        border: '0',
      },
    }

    const result = create(element, {}, 'Scene', { context })
    expect(result).toBeDefined()
  })

  test('CanvasBuilding (undefined component as child key) should not crash', () => {
    const element = {
      extend: 'Flex',
      props: { flow: 'y', width: '100%' },
      CanvasBuilding: {
        alignSelf: 'start',
        width: '100%',
        Hgroup: {
          margin: 'E2 - B2 -',
          H: {
            tag: 'strong',
            text: 'Building in visual Canvas',
          },
          P: {
            text: 'Build in Canvas...',
          },
        },
        CanvasEmbed: {
          project: '/nikoloza/default',
        },
      },
    }

    const result = create(element, {}, 'developers', { context })
    expect(result).toBeDefined()
  })

  test('Full developers page structure should not cause infinite loop', () => {
    const developers = {
      extend: 'Flex',
      props: {
        flow: 'y',
        width: '100%',
        align: 'center flex-start',
      },
      Flex: {
        flow: 'y',
        align: 'center flex-start',
        maxWidth: '100%',
        overflowX: 'auto',
        Hgroup: {
          alignSelf: 'start',
          margin: 'E2 - C -',
          H: {
            text: 'Symbols documentation',
          },
          P: {
            text: 'Explore documentation...',
          },
        },
        CanvasBuilding: {
          alignSelf: 'start',
          width: '100%',
          Hgroup: {
            margin: 'E2 - B2 -',
            H: {
              tag: 'strong',
              text: 'Building in visual Canvas',
            },
            P: {
              text: 'Build in Canvas...',
            },
          },
          CanvasEmbed: {
            project: '/nikoloza/default',
          },
        },
        Unified: {
          id: 'counter',
          width: '100%',
          margin: 'D1 - -',
          Hgroup: {
            margin: 'E - B2 -',
            H: {
              tag: 'strong',
              text: 'HTML, CSS, Javascript - unified!',
            },
            P: {
              text: 'Symbols unifies languages...',
            },
          },
          MonacoWithScene: {
            height: 'H1',
            state: {
              value: 'export default {}',
            },
          },
        },
        Counter: {
          id: 'counter',
          width: '100%',
          margin: 'D1 - -',
          MonacoWithScene: {
            height: 'H1',
            state: {
              value: {
                state: { count: 0 },
                Flex: {
                  align: 'center',
                  gap: 'A',
                  Button: { text: '+' },
                  P: { text: 'Count: {{ count }}' },
                },
              },
            },
          },
        },
      },
    }

    const result = create(developers, {}, 'content', { context })
    expect(result).toBeDefined()
  })
})
