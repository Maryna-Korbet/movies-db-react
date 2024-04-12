import { useState } from 'react';
import { createTheme, Switch } from '@mui/material';

export function SwitchTheme() {
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

  const SwitchComponent = (
    <Switch
      checked={themeMode === 'dark'}
      onChange={toggleThemeMode}
      inputProps={{ 'aria-label': 'toggle theme' }}
      color="primary"
      sx={{ marginLeft: 3 }}
    />
  );

  return {
      theme,
      themeMode,
      toggleThemeMode,
      SwitchComponent,
  }
}
