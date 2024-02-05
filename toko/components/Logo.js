export default {
  "extend": [
    "Link"
  ],
  "props": {
    "href": "/",
    "textDecoration": "none",
    "color": "currentColor",
    "style": {
      "whiteSpace": "nowrap"
    },
    "h1": {
      "fontWeight": 400,
      "margin": "0"
    }
  },
  "h1": {
    "text": "(el, state) => state.title || state.main.title"
  }
};