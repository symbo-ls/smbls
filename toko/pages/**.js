export default {
  "extend": "Flex",
  "props": {
    "flex": 1,
    "maxWidth": "840px",
    "height": "100%",
    "align": "flex-start space-between",
    "flow": "column"
  },
  "Flex": {
    "state": "*",
    "props": {
      "flex": 1,
      "align": "flex-start space-between",
      "flow": "column",
      "gap": "A2",
      "padding": "C D"
    },
    "text": "({\n          state\n        }) => state.fallback",
    "Link": {
      "props": {
        "href": "/"
      },
      "text": "({\n            state\n          }) => state.title"
    }
  }
};