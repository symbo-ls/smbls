'use strict'

export const Spacing = {
  tag: 'article',
  extend: 'Flex',

  Header: {
    tag: 'header',
    extend: 'Banner',

    Title: {
      props: {
        text: 'Spacing',
        lineHeight: '1.15em'
      }
    },
    Paragraph: {
      P: {},
      Flex: {
        Title: {},
        Paragraph: {
          ...[{
            props: { text: 'Brand font' }
          }, {
            props: { text: 'Functional font' }
          }]
        }
      }
    }
  }
}
