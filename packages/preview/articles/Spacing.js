'use strict'

export const Spacing = {
  tag: 'article',
  extends: 'Flex',

  Header: {
    tag: 'header',
    extends: 'Banner',

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
