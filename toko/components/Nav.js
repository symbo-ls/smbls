export default {
  "extend": [
    "Flex"
  ],
  "props": {
    "flow": "column",
    "gap": "A2",
    "@tabletS": {
      "display": "flex",
      "flow": "row",
      "margin": "auto 0 0",
      "padding": "C1 0 0",
      "gap": "D",
      "align": "center center",
      "fontSize": "Z2"
    },
    "@mobileL": {
      "fontSize": "B",
      "gap": "C2"
    },
    "@mobileS": {
      "gap": "B2"
    }
  },
  "childExtend": "MenuItem",
  "$stateCollection": "({\n        state\n      }) => state.main && [{\n        text: state.philosophy.title,\n        href: '/philosophy'\n      }, {\n        text: state.team.title,\n        href: '/team'\n      }, {\n        text: state.portfolio.title,\n        href: '/portfolio'\n      }]"
};