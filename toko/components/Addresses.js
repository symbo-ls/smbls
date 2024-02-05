export default {
  "extend": "Flex",
  "props": {
    "flow": "row",
    "@mobileM": {
      "flow": "column"
    },
    "gap": "B1",
    "margin": "auto - -"
  },
  "childExtend": {
    "props": {
      "width": "100%",
      "maxWidth": "16em"
    },
    "H6": {
      "fontWeight": "bold",
      "margin": "0",
      "text": "{{ title }}"
    },
    "meta": {
      "text": "{{ meta }}"
    },
    "city": {
      "text": "{{ city }}"
    }
  },
  "$stateCollection": "({\n        state\n      }) => {\n        return state.__root.main.address\n      }"
};