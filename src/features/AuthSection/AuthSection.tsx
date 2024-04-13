import { Typography, Box, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';


export function AuthSection() {

  const {loginWithRedirect, isAuthenticated, user, logout} = useAuth0();

  const onLogin = async() => {
    await loginWithRedirect({
      appState: {
        returnTo: "/"
      }
    })
  }

  const onLogOut = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      }
    })  
  }

  if (isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5}}>
        <Typography variant='h6' color="secondary" noWrap>Hello, {user?.name}!</Typography>
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
