'use strict'
import { Flex, Svg, Icon } from 'smbls'

import OVAL_CIRCLE_SVG from './ovalCircle.svg'

import { styleUploadSVG } from './style'

export const UploadSVG = {
  style: styleUploadSVG,
  extend: [Flex],

  props: {
    gap: 'Z'
  },
  oval: {
    props: { padding: 'B' },
    icon: {
      extend: Svg,
      src: OVAL_CIRCLE_SVG,

      style: {
        width: '42px',
        height: '42px'
      }
    }
  },
  upload: {
    props: {
      padding: 'B',
      round: 'Z'
    },
    label: {
      attr: {
        for: 'img'
      },
      input: {
        attr: {
          type: 'file',
          id: 'img'
        }
      },
      icon: {
        extend: Icon,
        props: { icon: 'plus' },

        style: {
          width: '26px',
          height: '26px',
          padding: '8px',
          opacity: '.1',
          cursor: 'pointer'
        }
      }
    }
  }
}
