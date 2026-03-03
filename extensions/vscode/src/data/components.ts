export interface ComponentInfo {
  label: string
  detail: string
  documentation: string
  snippet?: string
}

export const BUILT_IN_ATOMS: ComponentInfo[] = [
  {
    label: 'Box',
    detail: 'Box: object → <div>',
    documentation: 'Generic container element. Maps to `<div>`.\n\nCommon props: `padding`, `margin`, `background`, `border`, `borderRadius`, `width`, `height`, `overflow`, `position`',
    snippet: 'Box: {\n  ${1:padding}: "${2:A}",\n},'
  },
  {
    label: 'Flex',
    detail: 'Flex: object → <div> (flexbox)',
    documentation: 'Flexbox layout container.\n\nCommon props: `flow`, `align`, `gap`, `wrap`, `alignItems`, `justifyContent`\n\n```js\nFlex: {\n  flow: "y",\n  align: "center space-between",\n  gap: "B"\n}\n```',
    snippet: 'Flex: {\n  flow: "${1:y}",\n  gap: "${2:B}",\n},'
  },
  {
    label: 'Grid',
    detail: 'Grid: object → <div> (CSS grid)',
    documentation: 'CSS Grid layout container.\n\nCommon props: `columns`, `rows`, `gap`\n\n```js\nGrid: {\n  columns: "repeat(3, 1fr)",\n  gap: "A"\n}\n```',
    snippet: 'Grid: {\n  columns: "${1:repeat(3, 1fr)}",\n  gap: "${2:A}",\n},'
  },
  {
    label: 'Text',
    detail: 'Text: object → <span>',
    documentation: 'Inline text element.\n\nCommon props: `text`, `color`, `fontSize`, `fontWeight`, `lineHeight`\n\n```js\nText: { text: "Hello", fontSize: "B", color: "title" }\n```',
    snippet: 'Text: {\n  text: "${1:}",\n},'
  },
  {
    label: 'Button',
    detail: 'Button: object → <button>',
    documentation: 'Actionable button element.\n\nCommon props: `text`, `icon`, `type`, `disabled`, `theme`, `padding`, `round`, `onClick`\n\n```js\nButton: { text: "Save", theme: "primary", onClick: (ev, el) => {} }\n```',
    snippet: 'Button: {\n  text: "${1:Label}",\n  onClick: (event, el, state) => {\n    ${2:}\n  },\n},'
  },
  {
    label: 'Link',
    detail: 'Link: object → <a>',
    documentation: 'Anchor/link element.\n\nCommon props: `text`, `href`, `target`, `rel`, `color`, `textDecoration`\n\n```js\nLink: { text: "Read more", href: "/article" }\n```',
    snippet: 'Link: {\n  text: "${1:}",\n  href: "${2:/}",\n},'
  },
  {
    label: 'Input',
    detail: 'Input: object → <input>',
    documentation: 'Text input element.\n\nCommon props: `type`, `name`, `value`, `placeholder`, `required`, `disabled`, `onInput`, `onChange`\n\n```js\nInput: { type: "text", placeholder: "Enter name", onInput: (ev, el, state) => {} }\n```',
    snippet: 'Input: {\n  type: "${1:text}",\n  placeholder: "${2:}",\n},'
  },
  {
    label: 'Icon',
    detail: 'Icon: object → <svg> (icon sprite)',
    documentation: 'Icon from the design system sprite.\n\nCommon props: `name`, `boxSize`, `color`\n\n```js\nIcon: { name: "chevronRight", boxSize: "A" }\n```',
    snippet: 'Icon: {\n  name: "${1:}",\n},'
  },
  {
    label: 'IconText',
    detail: 'IconText: object → <div>',
    documentation: 'Icon + text combination.\n\nCommon props: `icon`, `text`, `gap`, `align`\n\n```js\nIconText: { icon: "search", text: "Search", gap: "Z" }\n```',
    snippet: 'IconText: {\n  icon: "${1:}",\n  text: "${2:}",\n},'
  },
  {
    label: 'Img',
    detail: 'Img: object → <img>',
    documentation: 'Image element.\n\nCommon props: `src`, `alt`, `loading`, `width`, `height`, `boxSize`, `objectFit`\n\n```js\nImg: { src: "/logo.png", alt: "Logo", boxSize: "B" }\n```',
    snippet: 'Img: {\n  src: "${1:}",\n  alt: "${2:}",\n},'
  },
  {
    label: 'Svg',
    detail: 'Svg: object → <svg>',
    documentation: 'Raw SVG container.\n\nCommon props: `html` (inline SVG markup), `width`, `height`, `viewBox`, `fill`, `stroke`\n\n```js\nSvg: { html: "<path d=\'...\' />", viewBox: "0 0 24 24" }\n```',
    snippet: 'Svg: {\n  html: "${1:}",\n  viewBox: "${2:0 0 24 24}",\n},'
  },
  {
    label: 'Iframe',
    detail: 'Iframe: object → <iframe>',
    documentation: 'Embedded content frame.\n\nCommon props: `src`, `title`, `allow`, `sandbox`, `width`, `height`\n\n```js\nIframe: { src: "https://example.com", width: "100%", height: "300px" }\n```',
    snippet: 'Iframe: {\n  src: "${1:}",\n  width: "${2:100%}",\n  height: "${3:300px}",\n},'
  },
  {
    label: 'Video',
    detail: 'Video: object → <video>',
    documentation: 'Video player element.\n\nCommon props: `src`, `poster`, `controls`, `autoplay`, `muted`, `loop`, `width`, `height`\n\n```js\nVideo: { src: "/demo.mp4", controls: true, width: "100%" }\n```',
    snippet: 'Video: {\n  src: "${1:}",\n  controls: true,\n},'
  },
  {
    label: 'Radio',
    detail: 'Radio: object → <input type="radio">',
    documentation: 'Radio input element.\n\nCommon props: `name`, `value`, `checked`, `disabled`, `onChange`\n\n```js\nRadio: { name: "option", value: "a" }\n```',
    snippet: 'Radio: {\n  name: "${1:}",\n  value: "${2:}",\n},'
  },
  {
    label: 'Checkbox',
    detail: 'Checkbox: object → <input type="checkbox">',
    documentation: 'Checkbox input element.\n\nCommon props: `name`, `value`, `checked`, `disabled`, `onChange`\n\n```js\nCheckbox: { name: "agree", checked: true }\n```',
    snippet: 'Checkbox: {\n  name: "${1:}",\n},'
  }
]

export const UIKIT_COMPONENTS: ComponentInfo[] = [
  // Typography
  { label: 'H1', detail: 'H1: object → <h1>', documentation: 'H1 heading. Common props: `text`, `color`, `fontSize`', snippet: 'H1: { text: "${1:}" },' },
  { label: 'H2', detail: 'H2: object → <h2>', documentation: 'H2 heading.', snippet: 'H2: { text: "${1:}" },' },
  { label: 'H3', detail: 'H3: object → <h3>', documentation: 'H3 heading.', snippet: 'H3: { text: "${1:}" },' },
  { label: 'H4', detail: 'H4: object → <h4>', documentation: 'H4 heading.', snippet: 'H4: { text: "${1:}" },' },
  { label: 'H5', detail: 'H5: object → <h5>', documentation: 'H5 heading.', snippet: 'H5: { text: "${1:}" },' },
  { label: 'H6', detail: 'H6: object → <h6>', documentation: 'H6 heading.', snippet: 'H6: { text: "${1:}" },' },
  { label: 'P', detail: 'P: object → <p>', documentation: 'Paragraph element.\n\nCommon props: `text`, `color`, `fontSize`, `lineHeight`, `maxWidth`', snippet: 'P: { text: "${1:}" },' },
  { label: 'Caption', detail: 'Caption: object → <span>', documentation: 'Small caption/label text.', snippet: 'Caption: { text: "${1:}" },' },
  { label: 'Headline', detail: 'Headline: object → <span>', documentation: 'Large emphasis/display text.', snippet: 'Headline: { text: "${1:}" },' },
  { label: 'Subhead', detail: 'Subhead: object → <span>', documentation: 'Subheading text.', snippet: 'Subhead: { text: "${1:}" },' },
  { label: 'Footnote', detail: 'Footnote: object → <span>', documentation: 'Footer reference text.', snippet: 'Footnote: { text: "${1:}" },' },
  { label: 'Strong', detail: 'Strong: object → <strong>', documentation: 'Bold inline text.', snippet: 'Strong: { text: "${1:}" },' },
  { label: 'Italic', detail: 'Italic: object → <em>', documentation: 'Italic inline text.', snippet: 'Italic: { text: "${1:}" },' },
  { label: 'U', detail: 'U: object → <u>', documentation: 'Underlined inline text.', snippet: 'U: { text: "${1:}" },' },

  // Dividers
  { label: 'Hr', detail: 'Hr: object → <hr>', documentation: 'Horizontal rule divider.', snippet: 'Hr: {},' },
  { label: 'HrLegend', detail: 'HrLegend: object → <div>', documentation: 'Divider with centered label text.\n\nCommon props: `text`', snippet: 'HrLegend: { text: "${1:Or}" },' },

  // Buttons (composite)
  { label: 'IconButton', detail: 'IconButton: object', documentation: 'Icon-only circular button.\n\nCommon props: `Icon.name`, `theme`, `fontSize`, `padding`\n\n```js\nIconButton: { Icon: { name: "plus" }, theme: "dialog" }\n```', snippet: 'IconButton: {\n  Icon: { name: "${1:}" },\n},' },
  { label: 'SubmitButton', detail: 'SubmitButton: object', documentation: 'Form submit button.\n\nCommon props: `value` (label).\n\n```js\nSubmitButton: { value: "Create account" }\n```', snippet: 'SubmitButton: {\n  value: "${1:Submit}",\n},' },

  // Avatar
  { label: 'Avatar', detail: 'Avatar: object', documentation: 'User profile image.\n\nCommon props: `boxSize` (default `"C2"`), `src`, `alt`\n\n```js\nAvatar: { boxSize: "C2" }\n```', snippet: 'Avatar: {\n  boxSize: "${1:C2}",\n},' },
  { label: 'AvatarStatus', detail: 'AvatarStatus: object', documentation: 'Avatar with status dot.\n\nCommon props: `Avatar.boxSize`, `StatusDot.theme`\n\n```js\nAvatarStatus: { StatusDot: { theme: "success" } }\n```', snippet: 'AvatarStatus: {\n  StatusDot: { theme: "${1:success}" },\n},' },
  { label: 'AvatarSet', detail: 'AvatarSet: object', documentation: 'Group of overlapping avatars.\n\nCommon props: `children`', snippet: 'AvatarSet: {\n  children: [${1:}],\n},' },
  { label: 'AvatarHgroup', detail: 'AvatarHgroup: object', documentation: 'Avatar with name and subtitle.\n\n```js\nAvatarHgroup: { H: { text: "Name" }, P: { text: "Role" } }\n```', snippet: 'AvatarHgroup: {\n  H: { text: "${1:}" },\n  P: { text: "${2:}" },\n},' },

  // Badge
  { label: 'Badge', detail: 'Badge: object', documentation: 'Small colored label badge.\n\nCommon props: `text`, `theme` (default `"warning"`)\n\n```js\nBadge: { text: "New", theme: "primary" }\n```', snippet: 'Badge: {\n  text: "${1:}",\n  theme: "${2:primary}",\n},' },
  { label: 'NotificationCounter', detail: 'NotificationCounter: object', documentation: 'Circular number badge.\n\nCommon props: `text` (number), `theme`\n\n```js\nNotificationCounter: { text: "5", theme: "primary" }\n```', snippet: 'NotificationCounter: {\n  text: "${1:0}",\n},' },

  // Form
  { label: 'Field', detail: 'Field: object', documentation: 'Styled text input with optional icon.\n\nCommon props: `Input.placeholder`, `Input.type`, `Icon.icon`, `theme`\n\n```js\nField: { Input: { placeholder: "Enter name" }, Icon: { icon: "user" } }\n```', snippet: 'Field: {\n  Input: { placeholder: "${1:}" },\n},' },
  { label: 'FieldCaption', detail: 'FieldCaption: object', documentation: 'Labeled field with caption above.\n\nCommon props: `Caption.text`, `Field` props', snippet: 'FieldCaption: {\n  Caption: { text: "${1:Label}" },\n  Field: { Input: { placeholder: "${2:}" } },\n},' },
  { label: 'Select', detail: 'Select: object → <select>', documentation: 'Native select element.\n\nCommon props: `children` (array of `{ text, value }` options)', snippet: 'Select: {\n  children: [\n    { text: "${1:Option}", value: "${2:value}" },\n  ],\n},' },
  { label: 'SelectPicker', detail: 'SelectPicker: object', documentation: 'Styled select with chevron icon.\n\nCommon props: `Select.children`, `Icon.name`', snippet: 'SelectPicker: {\n  Select: {\n    children: [\n      { text: "${1:Option}", value: "${2:value}" },\n    ],\n  },\n},' },
  { label: 'Search', detail: 'Search: object', documentation: 'Search input with icon.\n\nCommon props: `Input.placeholder`, `Icon.name`\n\n```js\nSearch: { Input: { placeholder: "Search…" } }\n```', snippet: 'Search: {\n  Input: { placeholder: "${1:Search…}" },\n},' },

  // Navigation
  { label: 'TabSet', detail: 'TabSet: object', documentation: 'Horizontal tab bar.\n\nCommon props: `children` (tab objects with `text` and optional `isActive`)\n\n```js\nTabSet: { children: [{ text: "Overview", isActive: true }, { text: "Details" }] }\n```', snippet: 'TabSet: {\n  children: [\n    { text: "${1:Tab 1}", isActive: true },\n    { text: "${2:Tab 2}" },\n  ],\n},' },
  { label: 'LinkSet', detail: 'LinkSet: object', documentation: 'Navigation list of links.\n\nCommon props: `tag: "nav"`, `childExtend: "Link"`, `children`', snippet: 'LinkSet: {\n  tag: "nav",\n  children: [\n    { text: "${1:Home}", href: "${2:/}" },\n  ],\n},' },
  { label: 'Breadcrumb', detail: 'Breadcrumb: object', documentation: 'Breadcrumb navigation.\n\nCommon props: `tag: "nav"`, `childExtend: "Link"`', snippet: 'Breadcrumb: {\n  tag: "nav",\n},' },
  { label: 'Pagination', detail: 'Pagination: object', documentation: 'Numbered page controls.', snippet: 'Pagination: {},' },

  // Progress / Status
  { label: 'Progress', detail: 'Progress: object', documentation: 'Linear progress bar.\n\nCommon props: `value` (0–1), `height`, `minWidth`, `round`, `theme`\n\n```js\nProgress: { value: 0.6, height: "X", round: "Y" }\n```', snippet: 'Progress: {\n  value: ${1:0.5},\n},' },
  { label: 'CircleProgress', detail: 'CircleProgress: object', documentation: 'Circular progress ring.\n\nCommon props: `value` (0–1), `boxSize`\n\n```js\nCircleProgress: { value: 0.73, boxSize: "D" }\n```', snippet: 'CircleProgress: {\n  value: ${1:0.5},\n  boxSize: "${2:D}",\n},' },
  { label: 'StatusDot', detail: 'StatusDot: object', documentation: 'Small status indicator dot.\n\nCommon props: `theme` (`"success"`, `"error"`, `"warning"`)\n\n```js\nStatusDot: { theme: "success" }\n```', snippet: 'StatusDot: {\n  theme: "${1:success}",\n},' },

  // Overlay
  { label: 'Modal', detail: 'Modal: object', documentation: 'Dialog overlay container.\n\nCommon props: `Hgroup.H.text`, `Hgroup.P.text`, `IconButton.Icon.name`, `theme: "dialog"`\n\n```js\nModal: { Hgroup: { H: { text: "Confirm" } }, IconButton: { Icon: { name: "x" } } }\n```', snippet: 'Modal: {\n  Hgroup: {\n    H: { text: "${1:Title}" },\n    P: { text: "${2:Subtitle}" },\n  },\n  IconButton: { Icon: { name: "x" } },\n},' },
  { label: 'Accordion', detail: 'Accordion: object', documentation: 'Expandable/collapsible section.\n\nCommon props: `ButtonParagraph.P.text`, `P.text`, `state.activeAccordion`', snippet: 'Accordion: {\n  ButtonParagraph: { P: { text: "${1:Question}" } },\n  P: { text: "${2:Answer}" },\n},' },

  // Data display
  { label: 'UnitValue', detail: 'UnitValue: object', documentation: 'Unit + value pair (price, stat).\n\nCommon props: `Unit.text`, `Value.text`, `flow`\n\n```js\nUnitValue: { Unit: { text: "$" }, Value: { text: "99" } }\n```', snippet: 'UnitValue: {\n  Unit: { text: "${1:$}" },\n  Value: { text: "${2:}" },\n},' },
  { label: 'Stars', detail: 'Stars: object', documentation: '5-star rating display.', snippet: 'Stars: {},' },

  // Layout helpers
  { label: 'Hgroup', detail: 'Hgroup: object', documentation: 'Heading group (heading + paragraph).\n\n```js\nHgroup: { H: { text: "Title" }, P: { text: "Subtitle" } }\n```', snippet: 'Hgroup: {\n  H: { text: "${1:}" },\n  P: { text: "${2:}" },\n},' },

  // Misc
  { label: 'Span', detail: 'Span: object → <span>', documentation: 'Inline span element.', snippet: 'Span: { text: "${1:}" },' },
  { label: 'Div', detail: 'Div: object → <div>', documentation: 'Generic div container.', snippet: 'Div: {},' },
  { label: 'Section', detail: 'Section: object → <section>', documentation: 'Section element.', snippet: 'Section: {},' },
  { label: 'Header', detail: 'Header: object → <header>', documentation: 'Header element.', snippet: 'Header: {},' },
  { label: 'Footer', detail: 'Footer: object → <footer>', documentation: 'Footer element.', snippet: 'Footer: {},' },
  { label: 'Nav', detail: 'Nav: object → <nav>', documentation: 'Navigation element.', snippet: 'Nav: {},' },
  { label: 'Main', detail: 'Main: object → <main>', documentation: 'Main content element.', snippet: 'Main: {},' },
  { label: 'Article', detail: 'Article: object → <article>', documentation: 'Article element.', snippet: 'Article: {},' },
  { label: 'Aside', detail: 'Aside: object → <aside>', documentation: 'Aside/sidebar element.', snippet: 'Aside: {},' },
  { label: 'Form', detail: 'Form: object → <form>', documentation: 'Form element.', snippet: 'Form: {\n  tag: "form",\n  onSubmit: (event, el, state) => {\n    event.preventDefault()\n    ${1:}\n  },\n},' },
  { label: 'Table', detail: 'Table: object → <table>', documentation: 'Table element.', snippet: 'Table: {},' },
  { label: 'Tr', detail: 'Tr: object → <tr>', documentation: 'Table row element.', snippet: 'Tr: {},' },
  { label: 'Td', detail: 'Td: object → <td>', documentation: 'Table data cell.', snippet: 'Td: {},' },
  { label: 'Th', detail: 'Th: object → <th>', documentation: 'Table header cell.', snippet: 'Th: {},' },
]

export const ALL_COMPONENTS = [...BUILT_IN_ATOMS, ...UIKIT_COMPONENTS]
