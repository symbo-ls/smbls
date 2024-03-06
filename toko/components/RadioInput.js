export const RadioInput = {
  extend: 'Input',
  attr: {
    name: ({
          props
        }) => props.name,
    checked: ({
          props
        }) => props.checked,
  },
  props: ({
        context
      }) => ({
        position: 'absolute',
        ':not(:checked)': {
          style: {
            '& + div > div': {
              display: 'none'
            },
            '& ~ span': {
              color: context.utils.scratchSystem.getColor('gray')
            }
          }
        }
      }),
};