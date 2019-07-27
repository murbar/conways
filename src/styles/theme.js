import { media } from './helpers';

const colors = {
  cream: 'hsl(39, 77%, 95%)',
  blueBlack: 'hsl(210, 14%, 11%)',
  blueGrey: 'hsl(214, 16%, 28%)',
  blue: 'hsl(196, 100%, 50%)',
  red: 'hsl(1, 90%, 54%)',
  gold: 'hsl(44, 100%, 48%)'
};

const addAlpha = (hsl, alpha) => {
  return `${hsl.slice(0, -1)}, ${alpha})`;
};

const primary = colors.blue;

const theme = {
  colors: {
    ...colors,
    background: colors.blueBlack,
    foreground: colors.cream,
    primary: primary,
    secondary: colors.blueGrey,
    cellShadowGradientStart: addAlpha(primary, 0.2)
  },
  inputBorderRadius: `0.5rem`,
  fontFamily: "'Rubik', sans-serif",
  media
};

export default theme;
