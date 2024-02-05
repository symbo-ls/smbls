export default {
  "props": {
    "flexFlow": "column",
    "gap": "B",
    "padding": "0 B2"
  },
  "childExtend": {
    "props": {
      "margin": "0"
    }
  },
  "h5": {
    "props": {
      "textTransform": "uppercase"
    },
    "text": "({\n          state\n        }) => state.title"
  },
  "Hr": {
    "margin": "0 -B2"
  },
  "paragraph": {
    "props": {
      "fontSize": "Z"
    },
    "text": "({\n          state\n        }) => state.description"
  },
  "extend": []
};