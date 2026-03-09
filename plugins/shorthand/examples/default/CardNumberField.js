export const CardNumberField = {
  state: {
    value: 'XXXXXXXXXXXXXXXX',
  },
  extends: 'Flex',
  childExtends: 'FixedNumberField',
  gap: '0',
  childProps: {
    Input: {
      textAlign: 'center',
      padding: 'X2 X',
      round: '0',
      outline: 'none',
      value: (el, s) => {
      const index = parseInt(el.parent.key)
      const valueArray = s.value
      const inputValue = el.node.value.split('')
      for (let i = 0; i < 4; i++) {
        const charIndex = index * 4 + i
        const numericPattern = /^\d$/
        const char = valueArray[charIndex]
        const isNumeric = numericPattern.test(char)
        if (isNumeric) inputValue[i] = char
      }
      return inputValue.join('')
    },
      ':focus-visible': {
        outline: 'none',
      },
      onUpdate: (el, s) => {
      el.node.value = el.props.value(el, s)
    },
      onInput: (ev, el, s, ctx) => {
      const index = parseInt(el.parent.key)
      const valueArray = s.value.split('')
      const inputValue = el.node.value
      for (let i = 0; i < 4; i++) {
        const charIndex = index * 4 + i
        valueArray[charIndex] = inputValue[i] || 'X'
      }
      s.update({
        value: valueArray.join('')
      })
      ctx.components.FixedNumberField.Input.onInput(ev, el, s, ctx)
    },
      onPaste: (ev, el, s) => {
      console.log(ev)
      const handlePastedInput = (event, validationFn) => {
        // Prevent default paste behavior
        event.preventDefault()

        // Get pasted text from clipboard
        const pastedText = event.clipboardData.getData('text/plain')

        // Apply custom validation/transformation function
        const value = validationFn ? validationFn(pastedText) : pastedText

        // Insert processed value into the input
        s.update({
          value
        })
      }

      // Example usage:
      const numericOnlyPaste = (input) => {
        // Remove any non-numeric characters
        return input.replace(/[^\d]/g, '')
      }

      const maxLengthPaste = (input, maxLength = 12) => {
        // Truncate input to maximum length
        return input.slice(0, maxLength)
      }

      return handlePastedInput(ev, (text) => {
        // Chain multiple transformations if needed
        return maxLengthPaste(numericOnlyPaste(text));
      });
    },
    },
    ':first-child input': {
      padding: 'X2 X X2 A1',
      round: 'A 0 0 A',
    },
    ':last-child input': {
      padding: 'X2 A1 X2 X',
      round: '0 A A 0',
    },
  },
  children: [
    {},
    {},
    {},
    {},
  ],
};