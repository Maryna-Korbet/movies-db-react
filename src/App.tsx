import { Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SwitchTheme } from './helpers/SwitchTheme';
import { AppHeader } from './features/AppHeader/AppHeader';


function App() {
  const { theme, SwitchComponent } = SwitchTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader SwitchComponent={SwitchComponent} />
      <main >
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;