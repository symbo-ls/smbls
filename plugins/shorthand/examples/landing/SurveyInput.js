export const SurveyInput = {
  extends: 'SurveyLabel',
  position: 'relative',
  align: 'stretch flex-start',
  Title: {},
  Input: {
    theme: 'field',
    margin: '- -Z',
    style: {
      width: '-webkit-fill-available',
    },
    padding: 'Z1 A2',
    placeholder: 'Please specify',
    attr: {
      name: (el) => {
        const compRoot = el.parent
        const fieldKey = compRoot.key
        return fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
      },
    },
    required: true,
    value: (el, s) => {
      const fieldKey = el.parent.key
      const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
      return s[key]
    },
    onChange: (ev, el, s) => {
      const fieldKey = el.parent.key
      const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
      s.update({
        [key]: ev.target.value
      })
    },
  },
};