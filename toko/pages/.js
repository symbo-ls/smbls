export default {
  "extend": "Layout",
  "Logo": {},
  "Flex": {
    "state": "main",
    "ShortNav": {},
    "Flex": {
      "props": {
        "flex": 1,
        "height": "100%",
        "maxWidth": "I",
        "flow": "column",
        "gap": "A2"
      },
      "H5": {
        "props": {
          "textTransform": "uppercase",
          "margin": "0"
        },
        "text": "({\n              state\n            }) => state.headline"
      },
      "content": {
        "props": {
          "flexFlow": "row",
          "alignItems": "stretch",
          "margin": "A2 -"
        },
        "text": "({\n              state\n            }) => state.description"
      }
    }
  },
  "Addresses": {}
};