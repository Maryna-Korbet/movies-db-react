import { Card, CardActions, CardMedia, IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useState, useRef } from "react";


export function CountdownVideo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null)

    function togglePlaying() {
        const nextPlaying = !isPlaying;

        if (nextPlaying) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    };
    
    return (
        <Card>
            <CardMedia>
                <video
                    ref={videoRef}
                    src="https://www.pixels.com/download/video/3843433"
                    height="500"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                autoPlay loop muted />
            </CardMedia>
            <CardActions>
                <IconButton onClick={togglePlaying}>
                    {isPlaying
                        ? <PauseIcon sx={{ height: 38, width: 38 }} />
                        : <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    }
                </IconButton>
        </CardActions>
        </Card>
    );
}