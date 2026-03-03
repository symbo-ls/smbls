export const FixedNumberField = {
  Input: {
    boxSize: 'B D',
    padding: 'X2 Z X2 A2',
    boxSizing: 'content-box',
    placeholder: '0000',
    letterSpacing: '.35em',
    maxlength: '4',
    textTransform: 'uppercase',
    style: {
      fontFamily: 'Courier, monospace',
    },
    onKeydown: (event, element, state) => {
      const numericPattern = /^\d$/;
      const navigationKeys = [
        "Backspace", "ArrowLeft", "ArrowRight", "Tab",
        "Delete", "Home", "End", "Enter", "Escape"
      ];
      const ctrlShortcuts = ["a", "c", "v", "x"];

      const isNumeric = numericPattern.test(event.key);
      const isNavigationKey = navigationKeys.includes(event.key);
      const isCtrlShortcut = (event.metaKey || event.ctrlKey) && ctrlShortcuts.includes(event.key);

      // Allow only numeric input, navigation keys, and Ctrl shortcuts
      if (!isNumeric && !isNavigationKey && !isCtrlShortcut) {
        event.preventDefault();
      }
    },
    onInput: (event, element, state) => {
      if (element.node.value.length === 0) {
        element.parent.previousElement()?.Input?.node.focus()
      }
      if (element.node.value.length > 3) {
        element.parent.nextElement()?.Input?.node.focus()
      }
    },
  },
  extends: 'InputField',
};