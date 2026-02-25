export const PackageFeatureItem = {
  tag: 'label',
  Input: {
    display: 'none',
    type: 'checkbox',
    ':checked + hgroup': {
      outline: '1.5px solid #0079FD',
    },
  },
  Hgroup: {
    width: '100%',
    padding: 'A1',
    round: 'A1',
    outline: '1.5px, solid, --color-line-dark',
    Icon: {
      order: '-1',
      margin: '- - A2',
      name: 'logo',
    },
  },
  extends: 'Flex',
  cursor: 'pointer',
};