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
    secondary: colors.bluGrey
  },
  media
};

export default theme;
