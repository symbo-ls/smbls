export const main = {
  extends: 'Page',
  padding: 'B',
  '@mobile': {
    padding: 'A'
  },

  onRender: (el, s) => {
    if (el.__init) return
    el.__init = true
    el.call('initApp', s)
  },

  Wrap: {
    extends: 'Flex',
    flow: 'y',
    gap: 'B',
    maxWidth: '900px',
    margin: '0 auto',
    width: '100%',

    AppHeader: {},

    // Survey view (default)
    SurveyView: {
      extends: 'Flex',
      id: 'view-survey',
      flow: 'y',
      width: '100%',

      FormCard: {
        extends: 'Flex',
        flow: 'y',
        width: '100%',
        background: 'white',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'slate200',
        round: 'C2',
        overflow: 'hidden',
        position: 'relative',

        SavingOverlay: {
          extends: 'Flex',
          id: 'saving-overlay',
          position: 'absolute',
          inset: '0',
          background: 'rgba(255,255,255,0.9)',
          zIndex: '50',
          flexAlign: 'center center',
          flow: 'y',
          gap: 'A',
          display: 'none',
          onRender: (el) => {
            el.node.innerHTML = '<div style="font-size:13px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.05em">UPLOADING REPORT...</div>'
          },
          onStateUpdate: (el, s) => {
            el.node.style.display = s.isSaving ? 'flex' : 'none'
          }
        },

        Phase1: {
          extends: 'Flex',
          flow: 'y',
          width: '100%',
          id: 'phase-1',
          SurveyPhase1: {}
        },

        Phase2: {
          extends: 'Flex',
          flow: 'y',
          width: '100%',
          id: 'phase-2',
          display: 'none',
          SurveyPhase2: {}
        },

        Phase3: {
          extends: 'Flex',
          flow: 'y',
          width: '100%',
          id: 'phase-3',
          display: 'none',
          SurveyPhase3: {}
        },

        FormFooter: {
          extends: 'Flex',
          justifyContent: 'space-between',
          flexAlign: 'center center',
          padding: 'A C',
          background: 'slate50',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: 'slate100',

          PrevBtn: {
            extends: 'Flex',
            tag: 'button',
            type: 'button',
            text: 'Previous',
            padding: 'A B2',
            round: 'B',
            cursor: 'pointer',
            borderWidth: '0',
            background: 'none',
            color: 'slate400',
            fontWeight: '700',
            fontSize: 'B',
            onRender: (el, s) => {
              el.node.setAttribute('data-prev-btn', '1')
              el.node.style.opacity = s.phase === 1 ? '0' : '1'
              el.node.style.pointerEvents = s.phase === 1 ? 'none' : 'auto'
            },
            onStateUpdate: (el, s) => {
              el.node.style.opacity = s.phase === 1 ? '0' : '1'
              el.node.style.pointerEvents = s.phase === 1 ? 'none' : 'auto'
            },
            onClick: (e, el, s) => {
              if (s.phase > 1) {
                el.call('switchPhase', s, s.phase - 1)
              }
            }
          },

          NextBtn: {
            extends: 'Flex',
            tag: 'button',
            type: 'button',
            padding: 'A C',
            round: 'B',
            cursor: 'pointer',
            borderWidth: '0',
            fontWeight: '700',
            fontSize: 'B',
            onRender: (el, s) => {
              el.node.setAttribute('data-next-btn', '1')
              el.node.textContent = s.phase < 3 ? 'Continue \u2192' : 'Submit Final Report'
              el.node.style.background = s.phase < 3 ? '#4f46e5' : '#059669'
              el.node.style.color = 'white'
            },
            onStateUpdate: (el, s) => {
              el.node.textContent = s.phase < 3 ? 'Continue \u2192' : 'Submit Final Report'
              el.node.style.background = s.phase < 3 ? '#4f46e5' : '#059669'
            },
            onClick: (e, el, s) => {
              if (s.phase < 3) {
                el.call('switchPhase', s, s.phase + 1)
              } else {
                el.call('submitForm', s)
              }
            }
          }
        }
      }
    },

    SuccessViewWrap: {
      extends: 'Flex',
      flow: 'y',
      width: '100%',
      id: 'view-success',
      display: 'none',
      SuccessView: {}
    },

    DashboardWrap: {
      extends: 'Flex',
      flow: 'y',
      width: '100%',
      id: 'view-dashboard',
      display: 'none',
      DashboardView: {}
    },

    Footer: {
      extends: 'Flex',
      flow: 'y',
      flexAlign: 'center center',
      gap: 'X',
      paddingBottom: 'C',
      marginTop: 'A',
      Caption1: {
        extends: 'Flex',
        flexAlign: 'center center',
        gap: 'X',
        tag: 'div',
        text: 'Real-time Team Feedback Portal',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: 'slate400'
      },
      Caption2: {
        extends: 'Flex',
        tag: 'div',
        text: '\u2728 Powered by Symbols / DOMQL v3',
        fontSize: '11px',
        color: 'indigo400',
        opacity: '0.6'
      }
    }
  }
}
