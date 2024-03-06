export const MenuIcon = {
  extend: 'Svg',
  props: ({
        context
      }) => ({
        src: context.designSystem.SVG_DATA && context.designSystem.SVG_DATA.document,
        width: 'B2',
        aspectRatio: '8/11'
      }),
};