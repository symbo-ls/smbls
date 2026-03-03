export const SurveyForm = {
  extends: 'Grid',
  tag: 'form',
  position: 'relative',
  columnGap: 'C',
  padding: 'C2',
  rowGap: 'B2',
  '@mobileM': {
    rowGap: 'C',
    padding: 'B 0',
  },
  attr: {
    action: 'https://formsubmit.co/hello@symbols.app',
    method: 'POST',
  },
  'SurveySelect.type': () => ({
    position: 'relative',
    Title: {
      text: 'Investor type'
    },
    options: [{
        text: 'Please specify',
        props: {
          selected: true,
          disabled: true
        }
      },
      {
        text: 'Individual'
      },
      {
        text: 'Venture Fund (LP)'
      },
      {
        text: 'Other Entity (Trust, LLC, Corporation, etc.)'
      },
    ]
  }),
  'SurveyInput.name': {
    Title: {
      text: 'Investor (Legal entity name)',
    },
    Input: {
      value: '{{ name }}',
    },
  },
  'SurveyInput.email': {
    type: 'email',
    Title: {
      text: 'Investor email',
    },
    Input: {
      value: '{{ email }}',
    },
  },
  'SurveyTextarea.note': {
    Title: {
      text: 'Note (optional)',
    },
    Textarea: {
      border: '0',
    },
  },
  ContinueButton: {
    extends: [
      'Button',
      'ContinueButton',
    ],
    type: 'submit',
    text: 'Book a call',
    padding: 'Z2 D',
    margin: '- -Z',
    fontWeight: '700',
    style: {
      justifySelf: 'start',
    },
    '@mobileL': {
      width: '100%',
    },
  },
};