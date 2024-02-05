export default {
  "extend": [
    "Flex",
    "Link"
  ],
  "props": "({\n        state\n      }) => ({\n        flexFlow: 'column',\n        gap: 'B',\n        padding: '0 B2',\n        href: state.url,\n        color: 'currentColor',\n\n        ':last-child': {\n          style: {\n            hr: {\n              display: 'none'\n            }\n          }\n        },\n\n        target: '_blank',\n        $href: {\n          style: {\n            cursor: 'pointer'\n          },\n          ':hover': {\n            style: {\n              h6: {\n                textDecoration: 'underline'\n              }\n            }\n          }\n        }\n      })",
  "childExtend": {
    "props": {
      "margin": "0"
    }
  },
  "title": {
    "tag": "h6",
    "props": {
      "fontWeight": 600
    },
    "text": "({\n          state\n        }) => state.title"
  },
  "paragraph": {
    "props": {
      "fontWeight": 400
    },
    "text": "({\n          state\n        }) => state.description"
  },
  "Hr": {
    "margin": "0 -B2"
  }
};