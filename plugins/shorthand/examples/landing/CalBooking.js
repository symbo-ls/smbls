export const CalBooking = {
  columnGap: 'C',
  padding: 'D C2',
  rowGap: 'C2',
  minWidth: 'G',
  minHeight: 'G',
  onInit: () => {
    (function(C, A, L) {
      const p = function(a, ar) {
        a.q.push(ar)
      }
      const d = C.document
      C.Cal = C.Cal || function() {
        const cal = C.Cal
        const ar = arguments
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          d.head.appendChild(d.createElement('script')).src = A
          cal.loaded = true
        }
        if (ar[0] === L) {
          const api = function() {
            p(api, arguments)
          }
          const namespace = ar[1]
          api.q = api.q || []
          typeof namespace === 'string' ?
            (cal.ns[namespace] = api) && p(api, ar) :
            p(cal, ar)
          return
        }
        p(cal, ar)
      }
    })(window, 'https://cal.com/embed.js', 'init')
  },
  onRender: (el, s) => {
    window.Cal('inline', {
      elementOrSelector: el.node, // You can also provide an element directly
      calLink: 'team/symbols', // The link that you want to embed. It would open https://cal.com/jane in embed
      config: {
        name: s.name, // Prefill Name
        email: s.email, // Prefill Email
        notes: 'Symbols Demo', // Prefill Notes
        // guests: ['janedoe@gmail.com', 'test@gmail.com'], // Prefill Guests
        theme: 'dark' // "dark" or "light" theme
      }
    })
  },
};