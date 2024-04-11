import { Container } from "@mui/material";
import { CountdownText } from "./CountdownText";
import { CountdownVideo } from "./CountdownVideo";

export default function About() {
    return (
        <Container sx={{ py: 8, maxWidth: 'lg', mt: 12}}>
            <CountdownText />
            <CountdownVideo />
        </Container>
    );
}

