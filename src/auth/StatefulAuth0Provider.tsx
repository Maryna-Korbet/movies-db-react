import { Auth0Provider, AppState } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import configuration from "../configuration";


interface StatefulAuth0ProviderProps {
    children: React.ReactNode,
};

const authConfig = {
    domain: configuration.auth0Domain!,
    clientId: configuration.auth0ClientId!,
    authorizationParams: {
        redirect_uri: configuration.aurh0RedirectUri,
    }
}

export function StatefulAuth0Provider({ children }: StatefulAuth0ProviderProps) {
    const navigate = useNavigate();

    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || window.location.pathname);
    }
    return (
        <Auth0Provider {...authConfig} cacheLocation="localstorage" onRedirectCallback={onRedirectCallback}>
            {children}
        </Auth0Provider>
    )
}