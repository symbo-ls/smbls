export const Feature = {
  props: {
    flexFlow: 'column',
    gap: 'B',
    padding: '0 B2',
  },
  childExtend: {
    props: {
      margin: '0',
    },
  },
  h5: {
    props: {
      textTransform: 'uppercase',
    },
    text: ({
          state
        }) => state.title,
  },
  Hr: {
    margin: '0 -B2',
  },
  paragraph: {
    props: {
      fontSize: 'Z',
    },
    text: ({
          state
        }) => state.description,
  },
  extend: [
  ],
};