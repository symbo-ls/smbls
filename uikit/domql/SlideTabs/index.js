'use strict'

import { Flex, Grid } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'
import { TitleParagraph } from '@symbo.ls/textcomponents'
import { Icon } from '@symbo.ls/icon'

export const SlideTabs = {
  extend: Grid,
  childExtend: Button,
  ...[{}, {}, {}],
  props: {
    columns: 'repeat(3, 1fr)',
    gap: 'Y',
    childProps: {
      padding: '0',
      background: 'white',
      height: 'Y',
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
    title: { props: { text: 'Symbols' } },
    paragraph: { props: { text: 'The easiest way to build your own website.' } }
  },
  slides: { extend: SlideTabs },

  props: {
    width: 'fit-content',
    flow: 'column',
    gap: 'B',
    padding: 'B',
    background: '#252527',
    heading: {
      title: { fontSize: 'C' },
      paragraph: { fontSize: 'A' }
    }
  }
}

export const SlideTabsCard = {
  slideIcon: { extend: Icon, props: { icon: 'atSign' } },
  slideTabs: { extend: SlideTabsWithTitleParagraph },

  props: {
    width: 'fit-content',
    padding: 'F E+D G E+D',
    position: 'relative',
    round: 'Z',
    overflow: 'hidden',
    style: { background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)' },
    slideIcon: {
      boxSize: 'E+W E+W'
    },
    slideTabs: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      background: 'rgba(0, 0, 0, .25)'

    }
  }
}
