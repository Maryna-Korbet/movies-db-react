import logo from './logo.svg';
import { useState } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { AppBar, CssBaseline, Toolbar, Avatar, Link, ThemeProvider, createTheme, Switch, Typography} from '@mui/material';

function HeaderLink({ children, to}: {children: React.ReactNode, to: string}) {
  return (
    <Link
      component={RouterLink}
      to={to}
      variant='button'
      underline="hover"
      sx={{
        fontSize: '1rem',
        color: '#9e9e9e',
        margin: '20px', 
        '@media (min-width: 768px)': { 
          fontSize: '1.2rem',
          margin: '40px', 
        },
      }}
    >
      {children}
    </Link>
  );
};

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const toggleThemeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#3e4451',
      },
      secondary: {
        main: '#9e9e9e',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar>
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '100px',
            paddingRight: '100px',
          }}>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <Avatar
              src={logo}
              alt="logo"
              style={{
                width: 'auto',
                height: '10vmin',
                pointerEvents: 'none',
                color: 'secondary',
                filter: 'invert(0.8)',
                marginTop: '20px',
                marginBottom: '20px',
              }} />
            <Typography variant='h6' color="secondary" noWrap>
              The Movies DB
            </Typography>
          </div>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
          </nav>
          <Switch
            checked={themeMode === 'dark'}
            onChange={toggleThemeMode}
            inputProps={{ 'aria-label': 'toggle theme' }}
            color="primary"
          />
        </Toolbar>
      </AppBar>
      <main >
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
