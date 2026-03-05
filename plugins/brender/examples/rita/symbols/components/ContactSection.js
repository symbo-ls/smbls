// ─── Contact Section ────────────────────────────────────────────────────────

export const ContactSection = {
  tag: 'section',
  id: 'contact',
  background: 'bgSubtle',
  padding: '96px 0',

  Inner: {
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '0 32px',
    '@tablet': { padding: '0 20px' },

    Grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '100px',
      alignItems: 'start',
      '@tablet': { gridTemplateColumns: '1fr', gap: '48px' },

      Info: {
        Eyebrow: {
          extends: 'Eyebrow',
          text: 'Get in Touch'
        },
        Title: {
          tag: 'h2',
          extends: 'H2',
          marginBottom: '18px',
          text: "Let's talk about your growth"
        },
        Lead: {
          extends: 'Lead',
          text: "Whether you need coaching, freelance support, or are looking for an angel investor \u2014 I'd love to hear from you."
        },

        Details: {
          extends: 'Flex',
          tag: 'div',
          flexFlow: 'column',
          marginTop: '40px',
          gap: '26px',

          EmailDetail: {
            Label: {
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'textQuaternary',
              marginBottom: '4px',
              display: 'block',
              text: 'Email'
            },
            Value: {
              fontSize: '15px',
              color: 'dark',
              Link: {
                tag: 'a',
                attr: { href: 'mailto:rk@rita-katona.com' },
                color: 'dark',
                transition: 'opacity 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
                ':hover': { opacity: '0.5' },
                text: 'rk@rita-katona.com'
              }
            }
          },

          LocationDetail: {
            Label: {
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'textQuaternary',
              marginBottom: '4px',
              display: 'block',
              text: 'Location'
            },
            Value: {
              fontSize: '15px',
              color: 'dark',
              text: 'Berlin, Germany'
            }
          },

          LinkedInDetail: {
            Label: {
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'textQuaternary',
              marginBottom: '4px',
              display: 'block',
              text: 'LinkedIn'
            },
            Value: {
              fontSize: '15px',
              color: 'dark',
              Link: {
                tag: 'a',
                attr: { href: 'https://linkedin.com/in/rita-katona-growth/', target: '_blank', rel: 'noopener' },
                color: 'dark',
                transition: 'opacity 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
                ':hover': { opacity: '0.5' },
                text: 'rita-katona-growth \u2197'
              }
            }
          }
        }
      },

      FormWrap: {
        Form: {
          tag: 'form',
          extends: 'Flex',
          flexFlow: 'column',
          gap: '8px',

          Row: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            '@tablet': { gridTemplateColumns: '1fr' },

            NameField: {
              extends: 'Field',
              tag: 'input',
              attr: { type: 'text', placeholder: 'Your name', name: 'name' }
            },
            EmailField: {
              extends: 'Field',
              tag: 'input',
              attr: { type: 'email', placeholder: 'Email address', name: 'email' }
            }
          },
          MessageField: {
            extends: 'Field',
            tag: 'textarea',
            attr: { placeholder: 'Tell me about your project\u2026', name: 'message', rows: '5' },
            resize: 'vertical',
            minHeight: '128px'
          },
          Submit: {
            extends: 'BtnPrimary',
            tag: 'button',
            attr: { type: 'submit' },
            text: 'Send Message'
          }
        }
      }
    }
  }
}

// ─── Form Field ─────────────────────────────────────────────────────────────

export const Field = {
  width: '100%',
  padding: '13px 15px',
  background: 'white',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'borderMedium',
  borderRadius: '2px',
  fontSize: '14px',
  color: 'dark',
  outline: 'none',
  transition: 'border-color 140ms cubic-bezier(0.0, 0.0, 0.2, 1), box-shadow 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
  ':focus': {
    borderColor: 'dark',
    boxShadow: '0 0 0 3px rgba(0,0,0,0.05)'
  },
  '::placeholder': {
    color: 'textQuaternary'
  }
}
