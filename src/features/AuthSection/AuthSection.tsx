import { useContext } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { AuthContext, anonymousUser } from '../../contexts/AuthContext';


export interface AuthSectionProps {
  onLogin: () => void;
  onLogOut: () => void;
}

export function AuthSection({ onLogin, onLogOut }: AuthSectionProps) {
  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  if (loggedIn) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5}}>
        <Typography variant='h6' color="secondary" noWrap>Hello, {user.name}!</Typography>
        <Button
          color="secondary"
          variant='outlined'
          onClick={onLogOut}
        >Log Out</Button>
      </Box>
    )
  }
  return (
        <Button
          color="secondary"
          variant='outlined'
          onClick={onLogin}
        >Log In</Button>
        )
}
