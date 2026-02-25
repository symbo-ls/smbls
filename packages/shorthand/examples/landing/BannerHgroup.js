export const BannerHgroup = {
  extends: 'Hgroup',
  alignItems: 'center',
  textAlign: 'center',
  gap: 'A',
  H: {
    extends: 'Flex',
    align: 'center flex-start',
    flow: 'row-reverse',
    tag: 'h2',
    fontSize: 'F1',
    text: 'Canvas where the code meets design.',
    color: 'title',
    fontWeight: '100',
    gap: 'W2',
    Span: {
      text: 'Symbols.',
      fontWeight: '700',
    },
  },
  P: {
    text: 'Work seamlessly with your team or clients in real-time. Build, test, and document apps with our streamlined platform, designed for developers.',
    maxWidth: 'H2',
    fontSize: 'A2',
  },
};