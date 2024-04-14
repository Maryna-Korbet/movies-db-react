import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Container, Alert, AlertTitle, LinearProgress, Box, Typography } from "@mui/material";
import { protectedApi } from "../../services/protectedApi";


export default function Protected() {
  const [response, setResponse] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getMessages = async () => {
      const accessToken = await getAccessTokenSilently();
      const messages = await protectedApi.getMessages(accessToken);
      setResponse(JSON.stringify(messages, null, 2));
    };

    getMessages();
  }, [getAccessTokenSilently]);

  return (
    <Container sx={{ p: 2 }}>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This page calls external API protected by JWT token.
      </Alert>
      {!response && <LinearProgress />}
      <Box sx={{ mt: 2 }}>
        <Typography variant="button">Response:</Typography>
        <pre>
          <code>{response}</code>
        </pre>
      </Box>
    </Container>
  );
}


