'use strict'

export const Search = {
  tag: 'search',

  props: {
    maxWidth: 'G3',
    gap: 'Z',
    onSubmit: (ev, el, s) => {}
  },

  Form: {
    extend: 'Field',
    props: {
      flow: 'row-reverse',

      Input: {
        padding: 'Z2 B Z2 C'
      },

      Icon: {
        margin: '- -C - Z1',
        name: 'search'
      }
    },

    Input: {
      props: {
        type: 'search',
        placeholder: 'Search',
        '::placeholder': { color: 'paragraph' }
      }
    },

    Icon: {},

    on: {
      submit: (ev, el, s) => el.parent.props.onSubmit(ev, el, s)
    }
  }
}

export const SearchWithButton = {
  extend: Search,
  props: {
    Button: { fontSize: 'B' }
  },

  Form: {
    Icon: {},
    Input: { props: { ':focus ~ button': { opacity: '1' } } },

    Button: {
      props: {
        opacity: '0',
        icon: 'x'
      },
      Icon: {
        on: {
          click: (e, el) => { el.parent.parent.Input.node.value = '' }
        }
      }
    }
  }
}

export const SearchWithDropDownButton = {
  extend: SearchWithButton,
  props: {
    theme: 'tertiary',
    maxWidth: 'G3+C',
    padding: '0 A 0 0',
    gap: 'Z'
  },
  DropDownButton: {},
  Input: { props: { padding: '- - - X' } },
  Button: {},
  Icon: {}
}
