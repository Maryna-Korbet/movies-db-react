import React from 'react';
import { AppBar, Toolbar, Avatar, Typography, Box} from '@mui/material';
import logo from '../../svg/logo.svg';
import { HeaderLink } from '../../helpers/HeaderLink';
import { AuthSection } from '../../features/AuthSection/AuthSection';


export interface AppHeaderProps {
  onLogin: () => void;
  onLogOut: () => void;
  SwitchComponent: React.ReactNode;
}

export function AppHeader({ onLogin, onLogOut, SwitchComponent }: AppHeaderProps) {
  return (
    <AppBar>
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '100px',
          paddingRight: '100px',
        }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={logo}
            alt="logo"
            style={{
              width: 'auto',
              height: '8vmin',
              pointerEvents: 'none',
              color: 'secondary',
              filter: 'invert(0.7)',
              marginTop: '20px',
              marginBottom: '20px',
            }} />
          <Typography variant='h6' color="secondary" noWrap>
            The Movies DB
          </Typography>
        </div>
        <Box>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Box>
        <AuthSection onLogin={onLogin} onLogOut={onLogOut} />
        {SwitchComponent}
      </Toolbar>
    </AppBar>
  )
}





