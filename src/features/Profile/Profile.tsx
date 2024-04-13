import { useAuth0 } from '@auth0/auth0-react';
import { Container, Stack, Box, Avatar, Typography } from "@mui/material";

export default function Profile() {

    const { user } = useAuth0();
    return (
        <Container sx={{ mt: 18 }}>
            <Stack>
                <Box>
                    <Avatar src={user?.picture} sx={{ mb: 2 }} />
                    <Box>
                        <Typography variant='h5' sx={{ mb: 2 }}>Name: {user?.name}</Typography>
                        <Typography variant='h5'>Email: {user?.email}</Typography>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
}