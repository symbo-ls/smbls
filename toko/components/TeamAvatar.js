export default {
  "extend": [
    "Flex"
  ],
  "tag": "figure",
  "props": {
    "flex": 1,
    "minWidth": "G1",
    "align": "center center",
    "margin": "0",
    "border": "1px, solid, gray",
    "padding": "B1",
    "Img": {
      "hide": false
    },
    "figcaption": {
      "hide": false
    }
  },
  "Img": {
    "props": "({\n          state\n        }) => ({\n          width: '100%',\n          src: state.poster,\n          aspectRatio: '1 / 1',\n          transition: 'opacity B, filter B',\n          opacity: '0.5',\n          style: {\n            filter: 'grayscale(0.85)'\n          },\n\n          '@tabletM': {\n            width: '85%'\n          }\n        })"
  },
  "figcaption": {
    "props": {
      "position": "absolute",
      "visibility": "hidden"
    },
    "text": "({\n          state\n        }) => state.name"
  }
};