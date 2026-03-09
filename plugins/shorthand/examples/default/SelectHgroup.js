export const SelectHgroup = {
  Hgroup: {
    gap: 'V2',
    H: {
      tag: 'h6',
    },
    P: {},
  },
  SelectPicker: {
    margin: '- - - auto',
    Select: {
      children: () => [{
          value: 'Goat',
        },
        {
          value: 'Icon',
        },
      ],
    },
  },
  extends: 'Flex',
  gap: 'C',
};