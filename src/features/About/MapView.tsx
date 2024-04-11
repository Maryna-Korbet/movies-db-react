import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Map } from "leaflet";
import { Box, Container, Typography } from "@mui/material";
import { createMapWidget, addPopupToMapWidget } from "../../helpers/mapWidget";
import usaFlag from "../../svg/usa-flag.svg";


export  function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [popupContainer, setPopupContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (mapRef.current === null) {
      const map = createMapWidget(containerRef.current!);
      mapRef.current = map;
      const popupDiv = addPopupToMapWidget(map);
      setPopupContainer(popupDiv);
    }
  }, []);

  return (
    <Container ref={containerRef} sx={{ width: 800, height: 500, my: 2 }}>
      {popupContainer !== null && createPortal(<Greeting />, popupContainer)}
    </Container>
  );
}

function Greeting() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
        <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10}}>New York</Typography>
        <img src={usaFlag} alt="USA Flag" style={{ width: 50,  marginBottom: 10}} />
</Box>
  );
}
