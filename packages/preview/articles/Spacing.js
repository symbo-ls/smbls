'use strict'

export const Spacing = {
  tag: 'article',
  display: 'flex',

  Header: {
    tag: 'header',
    extends: 'Banner',

    Title: {
      text: 'Spacing',
      lineHeight: '1.15em'
    },
    Paragraph: {
      P: {},
      Flex: {
        Title: {},
        Paragraph: {
          ...[
            {
              text: 'Brand font'
            },
            {
              text: 'Functional font'
            }
          ]
        }
      }
    }
  }
}
