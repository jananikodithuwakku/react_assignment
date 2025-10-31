import { useEffect, useRef, useState } from "react";
import "./Assignment_38.css";

export default function Assignment_38() {
  const audioRef = useRef(null); // reference for the audio player
  const lyricsRef = useRef(null); // reference for scrolling lyrics
  const [subtitles, setSubtitles] = useState([]); // store parsed SRT data
  const [activeIndex, setActiveIndex] = useState(null); // track current subtitl

  // load and parse SRT
  useEffect(() => {
    fetch("/audio/Ordinary.srt")
      .then((res) => res.text()) // read file as text
      .then((text) => {
        console.log("Loaded SRT ");
        const parsed = parseSRT(text); // parse subtitle text
        console.log(parsed); // store parsed subtitles
        setSubtitles(parsed);
      })
      .catch((err) => console.error("Error loading SRT:", err));
  }, []);

  // convert SRT text into array of subtitle objects
  const parseSRT = (data) => {
    const blocks = data.trim().split(/\n\s*\n/); // split by blank lines
    const result = [];

    for (let block of blocks) {
      const lines = block.split("\n");
      if (lines.length >= 3) {
        // extract start and end time
        const time = lines[1].match(
          /(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/
        );
        if (time) {
          const start = toSeconds(time[1]); // convert start time
          const end = toSeconds(time[2]); // convert end time
          const text = lines.slice(2).join(" "); // get subtitle text
          result.push({ start, end, text });
        }
      }
    }

    return result;
  };

  // convert HH:MM:SS,MS to total seconds
  const toSeconds = (t) => {
    const [h, m, s] = t.split(":");
    const [sec, ms] = s.split(",");
    return (
      parseInt(h) * 3600 +
      parseInt(m) * 60 +
      parseInt(sec) +
      parseInt(ms) / 1000
    );
  };

  // highlight and scroll current subtitle while playing
  const handleTimeUpdate = () => {
    const time = audioRef.current.currentTime; // current play time
    const index = subtitles.findIndex(
      (sub, i) =>
        time >= sub.start &&
        time <= sub.end &&
        (i === subtitles.length - 1 || time < subtitles[i + 1].start)
    );
    if (index !== -1 && index !== activeIndex) {
      setActiveIndex(index);  // update highlighted line
      lyricsRef.current?.children[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

   // when clicks subtitle, jump to that time
  const handleSubtitleClick = (time) => {
    audioRef.current.currentTime = time; // set audio position
    audioRef.current.play(); // resume playback
  };

  return (
    <div className="player">
      <h2> Ordinary - Subtitle Player</h2>

      <audio
        ref={audioRef}
        src="/audio/Ordinary.mp3"
        controls
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="lyrics-container" ref={lyricsRef}>
        {subtitles.map((sub, i) => (
          <div
            key={i}
            className={`subtitle-line ${i === activeIndex ? "active" : ""}`}
            onClick={() => handleSubtitleClick(sub.start)}
          >
            {sub.text}
          </div>
        ))}
      </div>
    </div>
  );
}
