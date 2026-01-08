
export const getAudioDuration = (audioSrc: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioSrc);

    audio.addEventListener("loadedmetadata", () => {
      const duration = audio.duration;
      const min = Math.floor(duration / 60);
      const sec = Math.floor(duration % 60)
        .toString()
        .padStart(2, "0");
      resolve(`${min}:${sec}`);
    });

    audio.addEventListener("error", (e) => reject(e));
  });
};
