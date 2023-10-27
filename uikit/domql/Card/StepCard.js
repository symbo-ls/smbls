'use strict'

import { Icon } from '@symbo.ls/icon'

export const StepCard = {
  props: {
    boxSize: 'fit-content',
    padding: 'F E2+A2 G E2+A2',
    position: 'relative',
    overflow: 'hidden',
    round: 'A2',
    backgroundColor: '#FF3CAC',
    background: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'
  },

  Icon: {
    extend: Icon,
    props: {
      icon: 'dribbble',
      boxSize: 'E'
    }
  },

  LineStepsWithTitleParagraph: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '100%',
    round: '0',
    background: 'black .2'
  }
}
