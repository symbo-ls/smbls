export const AppHeader = {
  extends: 'Flex',
  justifyContent: 'space-between',
  flexAlign: 'center center',
  flexWrap: 'wrap',
  gap: 'A',
  marginBottom: 'C',

  Logo: {
    extends: 'Flex',
    flexAlign: 'center center',
    gap: 'Z2',
    Icon: {
      extends: 'Flex',
      flexAlign: 'center center',
      background: 'indigo600',
      round: 'X',
      padding: 'X',
      Svg: {
        viewBox: '0 0 24 24',
        width: '24',
        height: '24',
        html: '<rect x="2" y="3" width="20" height="14" rx="2" fill="none" stroke="white" stroke-width="2"/><path d="M8 21h8M12 17v4" stroke="white" stroke-width="2" stroke-linecap="round"/>'
      }
    },
    Title: {
      extends: 'Flex',
      tag: 'h1',
      text: 'SYMBOLS BENCHMARK',
      fontSize: 'B',
      fontWeight: '900',
      letterSpacing: '0.05em',
      color: 'slate900'
    }
  },

  Nav: {
    extends: 'Flex',
    flexAlign: 'center center',
    background: 'white',
    padding: 'X',
    round: 'B',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'slate200',
    gap: 'X',
    overflowX: 'auto',

    PhaseTabs: {
      extends: 'Flex',
      gap: 'X',

      onRender: (el, s) => {
        if (el.__init) return
        el.__init = true
        var node = el.node
        ;[1, 2, 3].forEach(function (p) {
          var btn = document.createElement('button')
          btn.type = 'button'
          btn.textContent = 'PHASE ' + p
          btn.setAttribute('data-phase', p)
          var isActive = s.phase === p
          btn.style.cssText = 'padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:0.05em;cursor:pointer;border:none;transition:all 0.15s;' +
            (isActive ? 'background:#4f46e5;color:white;box-shadow:0 1px 4px rgba(79,70,229,0.3)' : 'background:transparent;color:#64748b')
          if (p === 2) {
            btn.style.opacity = s.isComparison ? '1' : '0.3'
            btn.style.pointerEvents = s.isComparison ? 'auto' : 'none'
          }
          btn.addEventListener('click', function () {
            el.call('switchPhase', s, p)
          })
          node.appendChild(btn)
        })
      },

      onStateUpdate: (el, s) => {
        var btns = el.node.querySelectorAll('button[data-phase]')
        btns.forEach(function (btn) {
          var p = parseInt(btn.getAttribute('data-phase'))
          var isActive = s.view === 'survey' && s.phase === p
          btn.style.background = isActive ? '#4f46e5' : 'transparent'
          btn.style.color = isActive ? 'white' : '#64748b'
          btn.style.boxShadow = isActive ? '0 1px 4px rgba(79,70,229,0.3)' : ''
          if (p === 2) {
            btn.style.opacity = s.isComparison ? '1' : '0.3'
            btn.style.pointerEvents = s.isComparison ? 'auto' : 'none'
          }
        })
        el.node.style.display = s.view === 'survey' && !s.isSubmitted ? 'flex' : 'none'
      }
    },

    Divider: {
      extends: 'Flex',
      width: '1px',
      height: 'A',
      background: 'slate200'
    },

    ResultsBtn: {
      extends: 'Flex',
      tag: 'button',
      type: 'button',
      flexAlign: 'center center',
      gap: 'X',
      padding: 'X A',
      round: 'X',
      cursor: 'pointer',
      borderWidth: '0',
      fontWeight: '700',
      fontSize: '11px',
      letterSpacing: '0.05em',
      text: 'RESULTS',
      onRender: (el, s) => {
        el.node.setAttribute('data-results-btn', '1')
        el.node.style.background = s.view === 'dashboard' ? '#4f46e5' : 'transparent'
        el.node.style.color = s.view === 'dashboard' ? 'white' : '#4f46e5'
      },
      onStateUpdate: (el, s) => {
        el.node.style.background = s.view === 'dashboard' ? '#4f46e5' : 'transparent'
        el.node.style.color = s.view === 'dashboard' ? 'white' : '#4f46e5'
      },
      onClick: (e, el, s) => {
        el.call('switchView', s, 'dashboard')
      }
    }
  }
}
