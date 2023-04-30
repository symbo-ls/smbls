'use strict'

import DOM from 'domql'
import { Collection } from '@symbo.ls/atoms'
var { performance } = window

const state = {
  title: 'domql',
  opts: { val: 'opts' },
  data: [
    { name: 'render', icon: '✅' },
    { name: 'render2', icon: '✅' },
    { name: 'render3', icon: '✅' },
  ]
}

DOM.create({
  state,

  h1: { text: (el, s) => s.title },
  
  el: {
    extend: Collection,
    state: 'data',
    childExtend: { 
      state: true,
      style: { 
        background: (el, s) => el.props?.background
      },
      div: {
        attr: { contentEditable: true },
        text: (el, s) => s.icon + ' ' + s.name,
      },
      div3: {
        state: '../../title',
        text: (el, s) => s.value,
      },
      div2: {
        state: '../../opts/val',
        text: (el, s) => s.value,
      },
      div4: {
        text: (el, s) => {
          return 'straight ' + s.parent.parent.title
        }
      },
      button: {
        text: 'remove',
        on: {
          click: (ev, el, s) => {
            s.parent.remove(el.parent.key)
          }
        }
      },
      buttonSetBlue: {
        tag: 'button',
        text: 'setBlue',
        on: {
          click: (ev, el, s) => {
            if (el.text === 'setBlue') {
              el.parent.setProps({ background: 'blue' })
              el.update({ text: 'setWhite' })
            } else {
              el.parent.setProps({ background: 'white' })
              el.update({ text: 'setBlue' })
            }
          }
        }
      },
      on: {
        input: (ev, el, s) => {
          s.update({ name: el.node.textContent })
        }
      }
    },
    $setPropsCollection: (el, state) => {
      return state
    }
  },

  button: {
    text: 'add',
    on: {
      click: (ev, el, s) => {
        s.data.push({ name: 'domql' + s.data.length, icon: '✅' })
        s.update({ data: s.data })
      }
    }
  },

  input: {
    on: {
      input: (ev, el, s) => {
        s.update({ title: el.node.value })
      }
    }
  },

  pre: {
    text: (el, s) => JSON.stringify(s.parse(), null, 2)
  },

  mere: {
    childExtend: {
      text: (el, s) => s.name,
    },
    $setStateCollection: (el, state) => {
      // console.warn(state.data)
      // return state.data
    }
  }
}, null, 'app')

// dom.update({ time: `${performance.now() - start}` })
