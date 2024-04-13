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
            <HeaderLink to="/rickandmorty">Episodes</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Box>
        <Box>
          <AuthSection />
          {SwitchComponent}
        </Box>
      </Toolbar>
    </AppBar>
  )
}





