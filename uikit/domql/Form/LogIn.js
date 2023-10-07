'use strict'

import { Modal } from '@symbo.ls/modal'
import { SocialLink } from '@symbo.ls/sociallink'
import { CommonForm } from './CommonForm'

export const LogIn = {
  extend: Modal,
  props: {
    minWidth: 'H+B',
    maxWidth: 'H+B',
    padding: 'B A'
  },

  Header: {
    props: { gap: 'Y1' },
    Title: {
      h5: {
        props: {
          text: 'Log in to your account',
          fontSize: 'D1'
        }
      }
    },
    Paragraph: {
      p: {
        props: {
          text: 'Enter your email address and password to log in.',
          color: 'gray4'
        }
      }
    }
  },

  Content: {
    props: {
      flow: 'column',
      padding: 'B - - -'
    },
    Form: {
      extend: CommonForm,
      props: {
        gap: 'B',
        childProps: {
          Field: {
            background: 'gray3',
            border: 'none'
          }
        }
      },
      ...[
        {
          Title: { text: 'Email' },
          Field: { Input: { placeholder: 'Enter your email' } }
        },
        {
          Title: { text: 'Password' },
          Field: {
            Input: { placeholder: 'Enter your password' },
            Button: { Icon: { name: 'eye' } }
          }
        }
      ]
    },
    ParagraphButtonWithCheckbox: {
      padding: 'A Z A Y',
      Checkbox: {},
      ParagraphButton: {
        flex: '1',
        justifyContent: 'space-between',
        P: { text: 'Keep me logged in' },
        Button: {
          text: 'Forgot your password?',
          textDecoration: 'none'
        }
      }
    },

    CommonButton: {
      minWidth: '100%',
      round: 'Y+W',
      Caption: { text: 'Sign in' }
    },

    DoubleHr: {
      padding: 'B -'
    }
  },

  Footer: {
    props: {
      flow: 'column',
      gap: 'A'
    },
    childExtend: {
      extend: SocialLink,
      props: {
        width: '100%'
      }
    },
    ...[
      {},
      {
        props: {
          Icon: { name: 'facebook' },
          text: 'Continue with Facebook'
        }
      }
    ]
  }

}
