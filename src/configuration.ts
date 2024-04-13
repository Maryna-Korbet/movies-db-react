const configuration = {
    apiUrl: process.env.REACT_APP_API_URL,
    apiToken: process.env.REACT_APP_API_TOKEN,

    auth0Domain: process.env.REACT_APP_AUTH0_DOMAIN,
    auth0ClientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    aurh0RedirectUri: process.env.REACT_APP_AUTH0_CALLBACL_URL,
}

export default configuration;