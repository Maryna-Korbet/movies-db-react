import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import configuration from "../../configuration";
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
        returnTo: configuration.baseUrl,
      },
    });
  };

  console.log("logOut", handleLogout);

  return isAuthenticated && user ? (
    <UserSettingsMenu user={user} onLogout={handleLogout} onOpenProfile={() => navigate("/profile")} />
  ) : (
    <Button color="secondary" variant='outlined' onClick={handleLogin}>
      Log in
    </Button>
  );
}
