import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export function CountdownText() {
    const [countdown, setCountdown] = useState(10);
    const intervalRef = useRef<any>();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCountdown(value => value - 1)
        }, 1000);
        
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            clearInterval(intervalRef.current);
        }
    });
    
    return (
        <Typography variant="h3" align="center">
            Comming coon: {countdown}
        </Typography>
    );
}