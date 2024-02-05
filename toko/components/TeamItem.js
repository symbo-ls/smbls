export default {
  "extend": [
    "Flex"
  ],
  "props": {
    "flow": "row",
    "flexAlign": "stretch",
    "gap": "A1",
    "& *": {
      "pointerEvents": "none"
    },
    ":hover": {
      "style": {
        "img": {
          "opacity": "1",
          "filter": "grayscale(0)"
        }
      }
    }
  },
  "TeamJoint": {
    "hide": false,
    "flex": "1 1 100%",
    "Info": {
      "@mobileM": {
        "flow": "column"
      },
      "TeamAvatar": {
        "@tabletM<": {
          "display": "none !important"
        },
        "@tabletM": {
          "order": -1
        }
      }
    }
  },
  "TeamAvatar": {
    "@tabletM": {
      "display": "none !important"
    }
  },
  "on": {
    "mouseover": "(ev, el, s) => {\n          if (s.highlight) return\n          el.TeamJoint.Info.meta.setProps({\n            theme: 'team'\n          })\n          s.update({\n            highlight: true\n          })\n        }",
    "mouseout": "(ev, el, s) => {\n          if (!s.highlight) return\n          el.TeamJoint.Info.meta.setProps({\n            theme: 'meta'\n          })\n          s.update({\n            highlight: false\n          })\n        }"
  }
};