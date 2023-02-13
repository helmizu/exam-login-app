import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      // dark: '#020B46',
      main: '#1d84b5',
      light: '#53a2be',
    },
    secondary: {
      main: '#f49fbc',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

export default theme;