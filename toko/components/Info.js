export default {
  "tag": "section",
  "extend": [
    "Flex"
  ],
  "props": "({\n        state\n      }) => ({\n        flow: 'row wrap',\n        minHeight: 'G',\n        alignItems: 'stretch',\n        transition: 'color B, background B',\n\n        meta: {\n          theme: state.highlight ? 'team' : 'meta',\n          transition: 'color B, background B',\n          flexFlow: 'column',\n          flex: 27,\n          padding: 'B2 C1 B2 B2',\n\n          h5: {\n            margin: '0',\n            fontWeight: 600,\n            textTransform: 'uppercase'\n          },\n\n          icons: {\n            margin: 'auto 0 0',\n            gap: 'A2'\n          },\n\n          '@tabletM': {\n            gap: 'C1',\n            flex: '1 1 45%'\n          }\n        },\n        description: {\n          theme: state.highlight ? 'team' : 'meta',\n          transition: 'color B, background B',\n          flow: 'column',\n          padding: 'B2',\n          gap: 'B1',\n          flex: 48,\n          fontSize: 'Z',\n\n          '@tabletM': {\n            order: '3',\n            flex: '1 1 100%'\n          }\n        },\n\n        mobileAvatar: {\n          display: 'none',\n\n          '@tabletM': {\n            display: 'flex',\n            flex: '1 1 45%'\n          }\n        },\n\n        '@tabletM': {\n          gap: 'A1'\n        }\n      })",
  "meta": {
    "h5": {
      "text": "({\n            state\n          }) => state.title"
    },
    "icons": {
      "extend": "Flex",
      "flag": {
        "if": "({\n              state\n            }) => state.country && state.parent.countries",
        "img": {
          "extend": "Svg",
          "props": "({\n                state\n              }) => {\n                const {\n                  country\n                } = state\n                const {\n                  countries\n                } = state.parent\n                if (!country || !countries) return\n                return {\n                  src: country && countries[country].src,\n                  width: 'B1',\n                  aspectRatio: '36 / 26'\n                }\n              }"
        }
      },
      "linkedin": {
        "extend": [
          "Link",
          "Button"
        ],
        "if": "({\n              state\n            }) => state.linkedin",
        "props": "({\n              state\n            }) => ({\n              color: 'currentColor',\n              icon: 'linkedin',\n              target: '_blank',\n              fontSize: 'C2',\n              margin: '-X1 -X 0',\n              padding: 'X',\n              href: state.linkedin,\n              type: null,\n              style: {\n                pointerEvents: 'all !important'\n              },\n              borderRadius: '0',\n              border: '1px solid transparent',\n              // ':hover': { border: '1px solid white' },\n              ':hover': {\n                theme: 'meta'\n              },\n              '@mobileL': {\n                margin: '-.1618em 0 0'\n              }\n            })"
      }
    }
  },
  "Vr": {
    "margin": "-B2 0",
    "@tabletM": {
      "display": "none"
    }
  },
  "description": {
    "extend": "Flex",
    "childExtend": {
      "tag": "p",
      "props": {
        "margin": "0"
      },
      "text": "({\n            state\n          }) => state.value"
    },
    "$stateCollection": "({\n          state\n        }) => state.description"
  },
  "TeamAvatar": {}
};