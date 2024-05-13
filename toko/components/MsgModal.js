export const MsgModal = {
  props: {
    maxWidth: 'H',
    '@mobileS': {
      fontSize: 'Z2',
    },
  },
  extend: [
    'Modal',
  ],
  Hgroup: {
    gap: 'A',
    H: {
      text: 'Message',
    },
    P: {
      text: 'this is just a demo for misho',
    },
  },
  XBtn: {
  },
};