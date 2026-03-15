export const ThankYou = {
  padding: 'C2',
  H2: {
    fontWeight: '300',
    text: 'Thank you',
    lineHeight: 1,
  },
  Grid: {
    margin: 'B 0 D',
    gap: 'B 7%',
    columns: 'repeat(2, 1fr)',
    childProps: {
      margin: '0',
    },
    children: [
      {
        text: 'Thanks for scrolling that far. We are open to answer your questions. Just talk to us to personalise your experience.',
      },
    ],
    childExtends: 'P',
  },
};