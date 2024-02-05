export default {
  "extend": "Layout",
  "Logo": {},
  "Flex": {
    "state": "portfolio/data",
    "ShortNav": {},
    "PortfolioItemList": {
      "props": {
        "background": "none",
        "padding": "0",
        "width": "100%",
        "maxWidth": "I",
        "flow": "column",
        "margin": "- - C1",
        "gap": "A1",
        "childProps": {
          "padding": "0 0 B1",
          "gap": "A",
          "Hr": {
            "margin": "A1 0 -A",
            "opacity": ".1",
            "background": "currentColor"
          }
        }
      },
      "$stateCollection": "({\n            key,\n            state\n          }) => state.parse()"
    }
  }
};