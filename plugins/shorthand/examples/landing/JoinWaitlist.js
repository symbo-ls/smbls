export const JoinWaitlist = {
  tag: 'form',
  flow: 'x',
  theme: 'field',
  round: 'C1',
  overflow: 'hidden',
  padding: 'X2',
  gap: 'X2',
  position: 'relative',
  maxWidth: 'G3+C1',
  width: '100%',
  onSubmit: async (ev, el, s) => {
    ev.preventDefault()

    const email = s.email.trim()

    if (!email) {
      s.update({
        status: 'error',
        error: 'Please enter an email.'
      })
      return
    }

    await s.update({
      status: 'loading',
      error: ''
    })

    const FORM_URL =
      'https://docs.google.com/forms/d/e/1FAIpQLScJzg36yk5Vy2gVBrL6TG4DgCA9CR2t00pDYqKniL9epZxSQQ/formResponse'

    const body = new URLSearchParams()
    body.set('entry.27167716', email)

    try {
      // In-browser: you may need mode:'no-cors' (you won't be able to read res status then)
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body,
        mode: 'no-cors'
      })

      el.call('openModal', '/thank-you-waitlist')

      s.update({
        status: 'success'
      })
      el.node.reset()
    } catch (err) {
      s.update({
        status: 'error',
        error: 'Something went wrong. Please try again.'
      })
    }
  },
  state: {
    status: 'idle',
    error: '',
  },
  LoadingGifSection: {
    position: 'absolute',
    inset: '0',
    theme: 'document',
    isActive: (el, s) => s.status === 'loading',
    transition: 'C, defaultBezier',
    transitionProperty: 'opacity, visibility',
    '!isActive': {
      opacity: 0,
      visibility: 'hidden',
    },
  },
  Success: {
    position: 'absolute',
    inset: '0',
    theme: 'document',
    flexAlign: 'center center',
    isActive: (el, s) => s.status === 'success',
    transition: 'C, defaultBezier',
    transitionProperty: 'opacity, visibility',
    '!isActive': {
      opacity: 0,
      visibility: 'hidden',
    },
    IconText: {
      gap: 'Z',
      icon: 'check',
      color: 'title',
      text: 'Thanks for registering your interest.',
      Icon: {
        color: 'green',
      },
    },
  },
  Input: {
    width: '100%',
    theme: 'transparent',
    placeholder: 'Enter your email',
    type: 'email',
    required: true,
    onInput: (ev, el, s) => {
      s.quietUpdate({
        email: el.node.value
      })
    },
    color: 'title',
  },
  Button: {
    theme: 'primary',
    text: 'Get notified',
    icon: 'checkmark',
    gap: 'X2',
    padding: 'Z2 B Z2 B2',
    align: 'center',
    type: 'submit',
    Icon: {
      order: 2,
      fontSize: 'B',
    },
  },
};