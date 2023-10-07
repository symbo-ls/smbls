# IconText Component
A simple and flexible IconText component that displays an icon alongside some text. The component extends the Flex component and allows for easy customization.

## Props

- `align`: (string) Alignment of the icon and text. Default value is `'center center'`.
- `lineHeight`: (number) Line height of the text. Default value is `1`.
- `icon`: (string) The name of the icon to be displayed. This prop will be removed in the future.
- `name`: (string) The name of the icon to be displayed.
- `text`: (string) The text to be displayed alongside the icon.

## Usage

```javascript
import { IconText } from 'smbls';

const MyComponent = {
  IconText: {
    icon: 'star',
    text: 'Hello, World!'
  }
}
```

## Customization

You can easily customize the appearance of the IconText component by passing additional props to the `Icon` or `text` components.

For example, you can change the color and size of the icon:

```javascript
const MyComponent = {
  IconText: {
    Icon: {
      name: 'star',
      color: 'blue'
    },
    text: 'Hello, World!'
  }
}
```