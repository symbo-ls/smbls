'use strict'

import { Flex } from '@symbo.ls/atoms'
import { ModalWithTitleParagraph } from '@symbo.ls/modal'
// import { FieldWithTitle } from '@symbo.ls/field'
// import { CheckBoxWithParagraph } from '@symbo.ls/textcomponents'
import { Button } from '@symbo.ls/button'
import { Icon } from '@symbo.ls/icon'
// import { OrLines } from '@symbo.ls/accessories'
import { Link } from '@symbo.ls/link'

const fields = {
  extend: Flex,
  // childExtend: FieldWithTitle,
  ...[
    {
      title: { props: { text: 'Email' } },
      field: { input: { props: { placeholder: 'Enter your email' } } }
    },
    {
      title: { props: { text: 'Password' } },
      field: {
        input: { props: { placeholder: 'Enter your password' } },
        eye: { extend: Icon }
      }
    }
  ],

  props: {
    flow: 'column',
    gap: 'B',
    childProps: {
      field: {
        width: '100%',
        eye: { position: 'absolute', right: 'A' },
        input: { border: 'none', background: '#252527' }
      }
    }
  }
}

const subOptions = {
  extend: Flex,
  // keepLogged: { extend: CheckBoxWithParagraph },
  forgotPass: {
    extend: Link,
    props: {
      text: 'Forgot your password?',
      fontWeight: '400',
      cursor: 'pointer'
    }
  },
  props: {
    align: 'center space-between',
    padding: 'Z+V -',
    forgotPass: { fontSize: 'Z' }
  }
}

const signButton = {
  extend: Button,
  props: {
    text: 'Sign in',
    background: '#0474F2',
    color: 'white',
    minWidth: '100%',
    padding: 'A -',
    round: 'Y+W',
    fontWeight: '500'
  }
}

const socialLinks = {
  extend: Flex,
  childExtend: {
    extend: [Link, Flex],
    socialIcon: { extend: Icon },
    p: {}
  },
  ...[
    {
      socialIcon: { props: { icon: 'atSign' } },
      p: { props: { text: 'Continue with Google' } }
    },
    {
      socialIcon: { props: { icon: 'facebook' } },
      p: { props: { text: 'Continue with Facebook' } }
    }
  ],

  props: {
    flow: 'column',
    width: '100%',
    gap: 'A',
    childProps: {
      align: 'center center',
      gap: 'Z',
      background: '#252527',
      round: 'Y+W',
      padding: 'Z+W -',
      cursor: 'pointer',
      p: {
        margin: '0',
        fontWeight: '500'
      }
    }
  }
}

export const SignUpForm = {
  extend: ModalWithTitleParagraph,
  header: {
    heading: {
      title: { props: { text: 'Log in to your account' } },
      paragraph: { props: { text: 'Enter your email address and password to log in' } }
    },
    close: null
  },
  content: {
    fields,
    subOptions,
    signButton
    // or: { extend: OrLines }
  },

  footer: { socialLinks },

  props: {
    minWidth: 'H',
    maxWidth: 'H',
    padding: 'B',
    gap: 'B',
    background: '#1C1C1F',
    header: {
      heading: {
        gap: 'Y',
        title: {
          fontSize: `${24 / 16}em`,
          fontWeight: '800'
        }
      }
    },

    content: {
      or: { margin: 'B - - -' }
    }
  }
}
