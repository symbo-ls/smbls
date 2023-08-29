'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'
import { TitleParagraph } from '@symbo.ls/textcomponents'

export const SlideTabs = {
  extend: Flex,
  childExtend: Button,
  ...[{}, {}, {}],
  props: {
    align: 'center flex-start',
    maxWidth: 'fit-contnet',
    gap: 'Y',
    childProps: {
      padding: '0',
      background: 'white',
      boxSize: 'Y E+A',
      round: '0',
      ':first-child': { round: 'E 0 0 E' },
      ':last-child': { round: '0 E E 0' }
    }
  }
}

export const SlideTabsWithTitleParagraph = {
  extend: Flex,
  heading: {
    extend: TitleParagraph,
    heading: { title: { props: { text: 'Symbols' } } },
    paragraph: { props: { text: 'The easiest way to build your own website.' } }
  },
  slides: { extend: SlideTabs },

  props: {
    maxWidth: 'fit-contnet',
    flow: 'column',
    gap: 'B',
    padding: 'B',
    background: '#252527',
    heading: {
      heading: { title: { fontSize: 'C' } },
      paragraph: { fontSize: 'A' }
    }
  }
}
