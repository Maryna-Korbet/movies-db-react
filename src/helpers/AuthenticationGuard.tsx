import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LinearProgress } from "@mui/material";


export interface AuthenticationGuardProps {
    component: React.ComponentType,
}

export function AuthenticationGuard({ component }: AuthenticationGuardProps ) { 
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => <LinearProgress color="primary" sx={{ mt: 3 }} />
    });

    return <Component />
}