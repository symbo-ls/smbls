export const PortfolioItem = {
  extend: [
    'Flex',
    'Link',
  ],
  props: ({
        state
      }) => ({
        flexFlow: 'column',
        gap: 'B',
        padding: '0 B2',
        href: state.url,
        color: 'currentColor',

        ':last-child': {
          style: {
            hr: {
              display: 'none'
            }
          }
        },

        target: '_blank',
        $href: {
          style: {
            cursor: 'pointer'
          },
          ':hover': {
            style: {
              h6: {
                textDecoration: 'underline'
              }
            }
          }
        }
      }),
  childExtend: {
    props: {
      margin: '1',
    },
  },
  title: {
    tag: 'h6',
    props: {
      fontWeight: 600,
    },
    text: ({
          state
        }) => state.title,
  },
  paragraph: {
    props: {
      fontWeight: 400,
    },
    text: ({
          state
        }) => state.description,
  },
  Hr: {
    margin: '0 -B2',
  },
};