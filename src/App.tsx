import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthContext, AuthInfo, anonymousUser } from './contexts/AuthContext';
import { SwitchTheme } from './helpers/SwitchTheme';
import { AppHeader } from './features/AppHeader/AppHeader';


export interface AuthAppProps {
  onLogin: () => void;
  onLogOut: () => void;
}

const fakeAuth: AuthInfo = { user: { name: 'John Doe'} };

function App() {
  const { theme, SwitchComponent } = SwitchTheme();
  const [auth, setAuth] = useState<AuthInfo>({ user: anonymousUser });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={auth}>
      <AppHeader onLogin={() => setAuth(fakeAuth)} onLogOut={() => setAuth({ user: anonymousUser })} SwitchComponent={SwitchComponent} />
      <main >
        <Outlet />
      </main>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;