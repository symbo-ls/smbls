export default {
  "extend": [
    "Flex"
  ],
  "props": {
    "flexFlow": "column",
    "gap": "A1",
    "@tabletM": {
      "flow": "column"
    }
  },
  "title": {
    "extend": "SectionHeading",
    "state": "name",
    "props": "({\n          state\n        }) => ({\n          transition: 'color B, background B',\n          theme: state.highlight ? '' : 'meta'\n        })"
  },
  "Info": {}
};