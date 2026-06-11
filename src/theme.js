import { createTheme } from '@mui/material';

export const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#8B5E3C',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#6C4C2E',
      },
      background: {
        default: mode === 'light' ? '#FFFFFF' : '#02030B',
        paper: mode === 'light' ? '#FFFFFF' : '#06111F',
      },
      text: {
        primary: mode === 'light' ? '#0F172A' : '#F8FAFC',
        secondary: mode === 'light' ? '#6B513F' : '#C9B3A1',
      },
      divider: mode === 'light' ? '#E5D3C1' : '#1F3248',
    },
    shape: {
      borderRadius: 24,
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontSize: '4.25rem',
        lineHeight: 1,
        letterSpacing: '-0.04em',
        fontWeight: 800,
      },
      h2: {
        fontSize: '2.5rem',
        lineHeight: 1.05,
        fontWeight: 700,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 700,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.75,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === 'light' ? '#FFFFFF' : '#04070E',
            color: mode === 'light' ? '#0F172A' : '#F8FAFC',
            transition: 'background-color 250ms ease, color 250ms ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
            padding: '0.95rem 1.8rem',
            boxShadow: 'none',
          },
        },
      },
    },
  });
