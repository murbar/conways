import { media } from './helpers';

const colors = {
  cream: 'hsl(39, 77%, 95%)',
  blueBlack: 'hsl(210, 14%, 11%)',
  blueGrey: 'hsl(214, 16%, 28%)',
  blue: 'hsl(196, 100%, 50%)'
};

const theme = {
  colors: {
    ...colors,
    background: colors.blueBlack,
    foreground: colors.cream,
    primary: colors.blue,
    secondary: colors.blueGrey,
    cellShadowGradientStart: 'hsla(196, 100%, 50%, 0.2)'
  },
  inputBorderRadius: `0.5rem`,
  fontFamily: "'Rubik', sans-serif",
  media
};

export default theme;
