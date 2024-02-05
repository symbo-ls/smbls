export default {
  "extend": "Svg",
  "props": "({\n        context\n      }) => ({\n        src: context.designSystem.SVG_DATA && context.designSystem.SVG_DATA.document,\n        width: 'B2',\n        aspectRatio: '8/11'\n      })"
};