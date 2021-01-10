
import { createMuiTheme } from "@material-ui/core/styles";
import Lato from './fonts/Lato/Lato-Regular.ttf';


const raleway = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Lato'),
    local('Lato-Regular'),
    url(${Lato}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};



const AppTheme=createMuiTheme({
    typography: {
      useNextVariations: true,
   }, 
   overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [raleway],
      },
    },
  },
    palette: {
      type: "light",
      primary: {
        dark: "#00646B",
        main: "#5f5f5f",
        light: "#707070",
        contrastText: "#ffffff",
      },
      secondary: {
       light: "#ffffff",//* not required
        main: "#00EEFF",
        dark: "#00646B", //* not required
        contrastText: "#000000",
      },
      Error: {
        light: "#ffb74d",
        main: "#ff9800",
        dark: "#f57c00",
      },
    },
  });
  
  export { AppTheme };
  