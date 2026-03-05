export const ShareModal = {
  extends: 'Flex',
  id: 'share-modal',
  position: 'fixed',
  inset: '0',
  zIndex: '100',
  flexAlign: 'center center',
  padding: 'A',
  display: 'none',

  Backdrop: {
    extends: 'Flex',
    position: 'absolute',
    inset: '0',
    background: 'rgba(15,23,42,0.6)',
    onClick: (e, el, s) => {
      var modal = document.getElementById('share-modal')
      if (modal) modal.style.display = 'none'
      s.update({ showShareModal: false })
    }
  },

  Card: {
    extends: 'Flex',
    flow: 'y',
    position: 'relative',
    background: 'white',
    round: 'C2',
    width: '100%',
    maxWidth: '480px',
    zIndex: '1',

    Header: {
      extends: 'Flex',
      justifyContent: 'space-between',
      flexAlign: 'center center',
      padding: 'B C',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'slate100',

      Title: {
        extends: 'Flex',
        flexAlign: 'center center',
        gap: 'X',
        tag: 'h3',
        text: 'Sharing Instructions',
        fontSize: 'C',
        fontWeight: '900',
        color: 'slate900'
      },

      CloseBtn: {
        extends: 'Flex',
        tag: 'button',
        type: 'button',
        flexAlign: 'center center',
        padding: 'X',
        round: '100%',
        cursor: 'pointer',
        borderWidth: '0',
        background: 'none',
        Svg: {
          viewBox: '0 0 24 24',
          width: '20',
          height: '20',
          html: '<line x1="18" y1="6" x2="6" y2="18" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>'
        },
        onClick: (e, el, s) => {
          var modal = document.getElementById('share-modal')
          if (modal) modal.style.display = 'none'
          s.update({ showShareModal: false })
        }
      }
    },

    Body: {
      extends: 'Flex',
      flow: 'y',
      gap: 'B2',
      padding: 'C',

      InfoBox: {
        extends: 'Flex',
        gap: 'A',
        padding: 'A',
        background: 'indigo50',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'indigo100',
        round: 'B',
        P: {
          extends: 'Flex',
          tag: 'p',
          fontSize: '13px',
          color: 'indigo700',
          lineHeight: '1.6',
          text: 'Share the preview URL and tell users to look at the Preview panel.'
        }
      },

      Steps: {
        extends: 'Flex',
        flow: 'y',
        gap: 'A',
        StepsLabel: {
          extends: 'Flex',
          tag: 'p',
          text: 'Steps for Teammates:',
          fontWeight: '700',
          fontSize: '13px',
          color: 'slate700'
        },
        StepsList: {
          extends: 'Flex',
          flow: 'y',
          gap: 'A',
          onRender: (el) => {
            el.node.innerHTML = '<ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:10px">' +
              '<li style="font-size:13px;color:#475569;font-weight:500;line-height:1.5">Send them the link from your browser address bar.</li>' +
              '<li style="font-size:13px;color:#475569;font-weight:500;line-height:1.5">They must <strong>Sign In</strong> if required by your deployment.</li>' +
              '<li style="font-size:13px;color:#475569;font-weight:500;line-height:1.5">The app is located in the <strong>Preview pane</strong>. They can scroll or interact with it directly.</li>' +
              '</ol>'
          }
        }
      },

      GotItBtn: {
        extends: 'Flex',
        tag: 'button',
        type: 'button',
        flexAlign: 'center center',
        text: 'Got it',
        padding: 'A',
        round: 'B',
        cursor: 'pointer',
        borderWidth: '0',
        background: 'indigo600',
        color: 'white',
        fontWeight: '700',
        fontSize: 'B',
        onClick: (e, el, s) => {
          var modal = document.getElementById('share-modal')
          if (modal) modal.style.display = 'none'
          s.update({ showShareModal: false })
        }
      }
    }
  }
}
