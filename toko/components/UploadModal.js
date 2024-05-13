export const UploadModal = {
  extend: [
    'Modal',
  ],
  props: {
    padding: 'A2 A2 A A2',
  },
  Hgroup: {
    H: {
      text: 'File Upload',
    },
    P: {
      display: 'none',
    },
  },
  UploadLabel: {
    margin: '- -V2',
    minWidth: '100%',
  },
  XBtn: {
  },
  BtnSet: {
    0: {
      props: {
        theme: 'transparent',
        padding: 'A -',
        gap: 'X',
        '@mobileM': {
          display: 'none',
        },
      },
      text: 'Support',
    },
    1: {
      props: {
        margin: '- - - auto',
        '@mobileM': {
          margin: '0',
        },
      },
      text: 'Cancel',
    },
    2: {
      text: 'Attach file',
      props: {
        theme: 'primary',
      },
    },
    extend: 'Flex',
    childExtend: 'Btn',
    props: {
      gap: 'Z2',
      margin: '- -V2',
      '@mobileM': {
      },
      childProps: {
        '@mobileM': {
          flex: '1',
        },
      },
    },
  },
};