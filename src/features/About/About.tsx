import { Container } from "@mui/material";
import { CountdownText } from "./CountdownText";
import { CountdownVideo } from "./CountdownVideo";
import { MapView } from "./MapView";


export default function About() {
    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            py: 8, maxWidth: 'lg',
            mt: 8
        }}>
            <CountdownText />
            <CountdownVideo />
            <MapView />
        </Container> 
    );
}

