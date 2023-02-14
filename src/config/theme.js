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
      main: '#fafafa',
    },
    error: {
      main: '#990000',
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#fafafa'
        },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#fafafa',
          },
          '&:hover fieldset': {
            borderColor: '#fafafaaa !important',
          },
        }
      }
    }
  }
});

export default theme;