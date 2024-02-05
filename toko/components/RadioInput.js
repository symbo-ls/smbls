export default {
  "extend": "Input",
  "attr": {
    "name": "({\n          props\n        }) => props.name",
    "checked": "({\n          props\n        }) => props.checked"
  },
  "props": "({\n        context\n      }) => ({\n        position: 'absolute',\n        ':not(:checked)': {\n          style: {\n            '& + div > div': {\n              display: 'none'\n            },\n            '& ~ span': {\n              color: context.utils.scratchSystem.getColor('gray')\n            }\n          }\n        }\n      })"
};