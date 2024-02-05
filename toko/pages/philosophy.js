export default {
  "state": "philosophy",
  "h4": {
    "props": {
      "margin": "Z1 E1 A2 C",
      "textTransform": "uppercase",
      "@tabletM": {
        "margin": "Z1 0 A2"
      }
    },
    "text": "({\n          state\n        }) => state.caption"
  },
  "content": {
    "0": {
      "SectionHeading": {
        "props": {},
        "text": "({\n              state\n            }) => state.who_we_are.title"
      },
      "col": {
        "props": {
          "theme": "philosophy",
          "flexFlow": "column",
          "flexAlign": "center",
          "padding": "B1 0 0",
          "flex": 1,
          "@tabletM": {
            "padding": "B1 0 0"
          }
        },
        "list": {
          "extend": "FeatureList",
          "$stateCollection": "({\n                state\n              }) => {\n                return state.who_we_are.data\n              }"
        },
        "darkgray": {
          "props": {
            "width": "100%",
            "background": "darkgray",
            "margin": "auto 0 0",
            "boxShadow": "0, 1px, 0, 1px, darkgray"
          },
          "Svg": {
            "props": {
              "src": "BUILD_SVG",
              "color": "orange",
              "width": "92.75%",
              "margin": "-2% 0 0",
              "aspectRatio": "535 / 95"
            },
            "style": {
              "boxSizing": "content-box"
            }
          }
        }
      }
    },
    "1": {
      "SectionHeading": {
        "props": {
          "theme": "meta",
          "border": "1px, solid"
        },
        "text": "({\n              state\n            }) => state.how_we_invest.title"
      },
      "FeatureList": {
        "props": {
          "theme": "meta",
          "flex": 1,
          "padding": "B1 0 D2",
          "@tabletM": {
            "padding": "B1 0 C"
          }
        },
        "$stateCollection": "({\n              state\n            }) => {\n              return state.how_we_invest.data\n            }"
      }
    },
    "props": {
      "flexFlow": "row",
      "alignItems": "stretch",
      "gap": "A1",
      "@tabletM": {
        "flexFlow": "column"
      }
    },
    "childExtend": {
      "props": {
        "flex": 1,
        "gap": "A1",
        "flexFlow": "column"
      }
    }
  }
};