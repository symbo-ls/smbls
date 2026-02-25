export const SurveyTextarea = {
  extends: 'SurveyLabel',
  width: '100%',
  position: 'relative',
  align: 'stretch flex-start',
  Title: {},
  Textarea: {
    theme: 'field',
    margin: '- -Z',
    style: {
      width: '-webkit-fill-available',
    },
    maxWidth: 'none',
    padding: 'Z1 A2',
    placeholder: 'Please specify',
    value: (el, s) => {
      const fieldKey = el.parent.key
      const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
      return s[key]
    },
    attr: {
      name: (el) => {
        const compRoot = el.parent
        const fieldKey = compRoot.key
        return fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
      },
    },
    required: true,
    onChange: (ev, el, s) => {
      const fieldKey = el.parent.key
      const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
      s.update({
        [key]: ev.target.value
      })
    },
    border: '0',
  },
};