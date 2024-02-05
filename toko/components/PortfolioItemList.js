export default {
  "extend": [
    "Flex"
  ],
  "props": {
    "gap": "B",
    "padding": "B2 0",
    "flow": "column",
    "theme": "portfolio"
  },
  "childExtend": "PortfolioItem",
  "$stateCollection": "({\n        key,\n        state\n      }) => state.parse()"
};