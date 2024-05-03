import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import { UserSettingsMenu } from '../UserSettingsMenu/UserSettingsMenu';


export function AuthSection() {

  const {loginWithRedirect, isAuthenticated, user, logout} = useAuth0();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return isAuthenticated && user ? (
    <UserSettingsMenu user={user} onLogout={handleLogout} onOpenProfile={() => navigate("/profile")} />
  ) : (
    <Button color="secondary" variant='outlined' onClick={handleLogin}>
      Log in
    </Button>
  );
}