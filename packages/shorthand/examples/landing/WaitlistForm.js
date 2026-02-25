export const WaitlistForm = {
  tag: 'form',
  state: {
    status: 'idle',
    error: '',
  },
  theme: 'field',
  round: 'C1',
  flow: 'x',
  padding: 'X',
  onSubmit: async (ev, el, s) => {
    ev.preventDefault()

    const input = el.querySelector('input[type="email"]')
    const email = (input?.value || '').trim()

    if (!email) {
      s.status = 'error'
      s.error = 'Please enter an email.'
      return
    }

    s.status = 'loading'
    s.error = ''

    const FORM_URL =
      'https://docs.google.com/forms/d/e/1FAIpQLScJzg36yk5Vy2gVBrL6TG4DgCA9CR2t00pDYqKniL9epZxSQQ/formResponse'

    const body = new URLSearchParams()
    body.set('entry.27167716', email)

    try {
      // In-browser: you may need mode:'no-cors' (you won't be able to read res status then)
      await fetch(FORM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body,
        mode: 'no-cors'
      })

      s.status = 'success'
      if (input) input.value = ''

      el.call('openModal', '/thank-you-waitlist')
    } catch (err) {
      s.status = 'error'
      s.error = 'Something went wrong. Please try again.'
    }
  },
  Input: {
    width: 'G',
    theme: 'transparent',
    placeholder: 'Enter your email',
    type: 'email',
    required: true,
  },
  Button: {
    theme: 'primary',
    text: 'Get notified',
    icon: 'arrow up right',
    gap: 'X2',
    padding: 'Z2 B Z2 B2',
    Icon: {
      order: 2,
      fontSize: 'B',
    },
  },
};