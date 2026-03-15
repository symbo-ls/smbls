export const SurveySelect = {
  extends: 'SurveyLabel',
  Title: {},
  DropdownField: {
    padding: '0',
    round: 'C1',
    tabIndex: '-1',
    margin: '- -Z',
    style: {
      width: '-webkit-fill-available',
    },
    Value: null,
    Select: {
      props: ({
        state
      }) => {
        return {
          outline: 'none',
          border: 'none',
          background: 'transparent',
          color: 'currentColor',
          padding: 'Z1 A2',
          round: 'C1',
          width: '100%',
          appearance: 'none',
        }
      },
      attr: {
        name: (el) => {
          const compRoot = el.parent.parent
          const fieldKey = compRoot.key
          return fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
        },
      },
      childExtend: {
        props: (el, s) => {
          const compRoot = el.parent.parent.parent.parent
          const fieldKey = compRoot.key
          const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
          const value = el.text
          const stateValue = s[key]
          if (el.key === '0' && !stateValue) return {
            selected: true
          }
          return {
            selected: value === stateValue
          }
        },
      },
      children: ({
        parent
      }) => {
        return parent.parent.props.options
      },
      on: {
        change: (ev, el, s) => {
          const compRoot = el.parent.parent
          const fieldKey = compRoot.key
          const key = fieldKey.includes('.') ? fieldKey.split('.')[1] : fieldKey
          const value = ev.target.value
          if (value === 'Other') {
            s[key] = 'Other'
            return compRoot.setProps({
              SurveyOtherInput: {
                hide: !compRoot.SurveyOtherInput.props.hide
              }
            })
          }
          compRoot.setProps({
            SurveyOtherInput: {
              hide: true
            }
          }, {
            preventUpdate: true
          })
          s.update({
            [key]: ev.target.value
          })
        },
      },
    },
    Buttons: {
      position: 'absolute',
      right: 'Z',
      pointerEvents: 'none',
    },
  },
  SurveyOtherInput: {
    margin: '0 -Z',
  },
};