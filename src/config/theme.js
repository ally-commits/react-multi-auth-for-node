import {createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    overrides: { 
      MuiButton: { 
        root : { 
          textTransform: 'capitalize',
          fontWeight: "400", 
          padding: '6px 14px'
        },
        text: {  
          textTransform: 'capitalize'
        },
      },
    },
    palette: {
      primary: {
        main: "#0F5EEA",
      },
      secondary: {
        main: "#FF8F43",
      },
    },
}); 