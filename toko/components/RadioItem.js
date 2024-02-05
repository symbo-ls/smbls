export default {
  "tag": "label",
  "props": {
    "gap": "A",
    "flexAlign": "center",
    "color": "white",
    "position": "relative",
    "Input": {
      "type": "radio",
      "name": "filter",
      "position": "absolute",
      "opacity": "0",
      "inset": "0 0 0 0",
      "appearance": "none"
    },
    "style": {
      "whiteSpace": "nowrap"
    },
    "@mobileM": {
      "gap": "W"
    }
  },
  "Input": {},
  "Radio": {},
  "span": {
    "props": "({\n          state\n        }) => ({\n          text: state.value\n        })"
  },
  "extend": []
};