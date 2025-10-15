import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Assignment_28() {
    // references for audio, analyzer, and audio context
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const contextRef = useRef(null);
  const sourceRef = useRef(null);
  const dataArrayRef = useRef(new Uint8Array(32));
  const [bars, setBars] = useState(new Array(32).fill(0)); // holds frequency data values for visualization

  // initialize AudioContext and Analyser on component mount
  useEffect(() => {
    contextRef.current = new AudioContext();
    analyserRef.current = contextRef.current.createAnalyser();
    analyserRef.current.fftSize = 64; // controls number of frequency bins
    dataArrayRef.current = new Uint8Array(
      analyserRef.current.frequencyBinCount
    );
  }, []);

   // start visualizer animation when audio plays
  const handlePlay = () => {
    const context = contextRef.current;
    const analyser = analyserRef.current;

    if (context.state === "suspended") {
      context.resume();
    }

    // connect audio source to analyser and output
    if (!sourceRef.current) {
      sourceRef.current = context.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyser);
      analyser.connect(context.destination);
    }

    // continuously update bar heights based on frequency data
    const animate = () => {
      analyser.getByteFrequencyData(dataArrayRef.current);
      setBars([...dataArrayRef.current]);
      requestAnimationFrame(animate); // smooth animation
    };
    animate();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: 420,
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          bgcolor: "#1e1e1e",
          color: "white",
          p: 2,
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#00d9ffff" }}>
            Audio Visualizer
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
              gap: "5px",
              height: 175,
              background: "#000",
              borderRadius: "12px",
              overflow: "hidden",
              mb: 2,
            }}
          >
            
            {/* loop through 32 frequency bars to render visualizer bars */}
            {bars.slice(0, 32).map((v, i) => (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: `${v / 1.5}px`, // set bar height based on audio frequency data
                  background: "linear-gradient(180deg, #00ccffff, #080077ff 80%)",
                  borderRadius: "4px 4px 0 0 ",
                  transition: "height 0.1s linear",
                }}
              />
            ))}
          </Box>

          <audio
            ref={audioRef}
            src={new URL("./audio/audio-music.mp3", import.meta.url).href}
            controls
            onPlay={handlePlay}
            style={{
              width: "100%",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          />

        </CardContent>
      </Card>
    </Box>
  );
}
