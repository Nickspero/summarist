"use client"
import { useEffect, useRef, useState } from "react";
import "./componentStyles/AudioPlayer.css"
import { RiForward10Line, RiReplay10Line, RiPlayFill, RiPauseFill } from "react-icons/ri";

type Props = {
  audioSrc: string;
  title: string;
  author: string;
  image: string;
};

const AudioPlayer = ({ audioSrc, title, author, image }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setMeta);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="audio__wrapper">
      <audio ref={audioRef} src={audioSrc} />

      <div className="audio__track--wrapper">
        <figure className="book__image--wrapper">
          <img className="book__image" src={image} alt="" />
        </figure>

        <div className="audio__track--details-wrapper">
          <div className="audio__track--title">{title}</div>
          <div className="audio__track--author">{author}</div>
        </div>
      </div>

      <div className="audio__controls">
        <button className="audio__controls--btn" onClick={() => seek(currentTime - 10)}>
          <RiReplay10Line />
        </button>

        <button className="audio__controls--btn-play" onClick={togglePlay}>
          {isPlaying ? <RiPauseFill /> : <RiPlayFill />}
        </button>

        <button className="audio__controls--btn" onClick={() => seek(currentTime + 10)}>
          <RiForward10Line />
        </button>
      </div>

      <div className="audio__progress--wrapper">
        <div className="time">{formatTime(currentTime)}</div>

        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={(e) => seek(Number(e.target.value))}
        />

        <div className="time" >{formatTime(duration)}</div>
      </div>
    </div>
  );
};

export default AudioPlayer;
