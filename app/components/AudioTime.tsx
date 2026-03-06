import { useEffect, useRef, useState } from "react";
import formatTime from "./FormatTime";

const AudioTime = ({ audioSrc }: any) => {

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    if (!audio) return;
    const setMeta = () => setDuration(audio.duration);

    audio.addEventListener("loadedmetadata", setMeta);

    return () => {
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, [audioSrc]);

  return <div className="time">{formatTime(duration)}</div>;
};

export default AudioTime;
