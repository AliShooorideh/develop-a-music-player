import Controls from "@/components/Controls";
import ListMusic from "@/components/ListMusic";
import ProgressBar from "@/components/ProgressBar";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const boxVariants = {
  checked: { rotateY: 360 },
};
export default function Home() {
  const [musicList] = useState<
    Array<{ title: string; srcMusic: string; imgSrc: string }>
  >([
    {
      title: "Calm Cam - TrackTribe",
      srcMusic: "./music/Calm Cam - TrackTribe.mp3",
      imgSrc: "/images/001.jpg",
    },
    {
      title: "Confident Kurt - TrackTribe",
      srcMusic: "./music/Confident Kurt - TrackTribe.mp3",
      imgSrc: "/images/002.jpg",
    },
    {
      title: "Deck The Halls - DJ Williams",
      srcMusic: "./music/Deck The Halls - DJ Williams.mp3",
      imgSrc: "/images/003.jpg",
    },
    {
      title: "On The Rocks - TrackTribe",
      srcMusic: "./music/On The Rocks - TrackTribe.mp3",
      imgSrc: "/images/004.jpg",
    },
    {
      title: "Wish You'd Never Left - TrackTribe",
      srcMusic: "./music/Wish You'd Never Left - TrackTribe.mp3",
      imgSrc: "/images/005.jpg",
    },
  ]);
  const [playingList, setPlayingList] =
    useState<Array<{ title: string; srcMusic: string; imgSrc: string }>>(
      musicList
    );

  const [currentSong, setCurrentSong] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [dark, setDark] = useState<boolean>(false);
  const [playPause, setPlayPause] = useState(false);
  const [repeatSong, setRepeatSong] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>();
  const [time, setTime] = useState<number>();
  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const playAnimationRef = useRef<number>();
  const progressBarRef = useRef<any>();
  const repeat = () => {
    const currentTime = audioPlayer.current?.currentTime;
    setTime(currentTime);
    if (duration) {
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`
      );
      if (duration === audioPlayer.current?.currentTime) {
        if (repeatSong) {
          setCurrentSong(currentSong);
        } else {
          if (currentSong != musicList.length - 1) {
            setCurrentSong(currentSong + 1);
          } else {
            setCurrentSong(0);
          }
        }
      }
    }

    playAnimationRef.current = requestAnimationFrame(repeat);
  };
  useEffect(() => {
    if (audioPlayer.current && playPause === true) {
      audioPlayer.current.play();
    }
    if (audioPlayer.current && playPause === false) {
      audioPlayer.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioPlayer.current, playPause, repeat]);
  const IsplayMusic = () => {
    setPlayPause(!playPause);
  };

  const onLoadedMetadata = () => {
    const seconds = audioPlayer.current?.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  return (
    <div className={`${dark && "dark"}`}>
      <audio
        ref={audioPlayer}
        src={playingList[currentSong].srcMusic}
        onLoadedMetadata={onLoadedMetadata}
      />

      <div className="absolute top-0 -z-10">
        <Image
          className="fixed h-full w-full scale-[1.1] object-cover blur-md"
          loading="lazy"
          src={playingList[currentSong].imgSrc}
          alt={""}
          width="0"
          height="0"
          sizes="100vw"
        />
      </div>
      <motion.div
        transition={{ duration: 0.3 }}
        animate={open ? { height: 550 } : { height: 100 }}
        initial={{ height: 100 }}
        className="fixed inset-x-0 top-0 flex flex-col items-center rounded-b-[50px] border-x border-b border-white bg-white bg-opacity-30 pb-8 backdrop-blur-sm dark:border-none dark:bg-black dark:bg-opacity-70"
      >
        <div className="flex w-full items-center justify-between px-7 py-2 ">
          <div className="borderGeradiant flex h-14 w-14 items-center justify-center rounded-full bg-white bg-opacity-50 backdrop-blur-sm">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 26L0 13L13 0L15.3156 2.275L6.21562 11.375H26V14.625H6.21562L15.3156 23.725L13 26Z"
                className="fill-[#424040] dark:fill-white"
              />
            </svg>
          </div>
          <div className="mt-4 flex flex-col items-center dark:text-white">
            <span className="text-shadow text-xl font-medium">Now Playing</span>
            <span className="text-base font-medium opacity-70">Album</span>
          </div>

          <div
            onClick={() => setDark(!dark)}
            className="borderGeradiant flex h-14 w-14 items-center justify-center rounded-full bg-white bg-opacity-50 backdrop-blur-sm"
          >
            <motion.svg
              initial={false}
              animate={dark ? "checked" : "unchecked"}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="focus:outline-none"
            >
              {!dark ? (
                <motion.path
                  transition={{ duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
                  d="M12 24C8.66667 24 5.83333 22.8333 3.5 20.5C1.16667 18.1667 0 15.3333 0 12C0 8.66667 1.16667 5.83333 3.5 3.5C5.83333 1.16667 8.66667 0 12 0C12.3111 0 12.6169 0.0111112 12.9173 0.0333335C13.2178 0.0555557 13.512 0.0888888 13.8 0.133333C12.8889 0.777778 12.1609 1.61689 11.616 2.65067C11.0711 3.68444 10.7991 4.80089 10.8 6C10.8 8 11.5 9.7 12.9 11.1C14.3 12.5 16 13.2 18 13.2C19.2222 13.2 20.3444 12.9276 21.3667 12.3827C22.3889 11.8378 23.2222 11.1102 23.8667 10.2C23.9111 10.4889 23.9444 10.7831 23.9667 11.0827C23.9889 11.3822 24 11.688 24 12C24 15.3333 22.8333 18.1667 20.5 20.5C18.1667 22.8333 15.3333 24 12 24Z"
                  fill="#424040"
                  variants={boxVariants}
                />
              ) : (
                <motion.path
                  transition={{ duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
                  d="M12 24C8.66667 24 5.83333 22.8333 3.5 20.5C1.16667 18.1667 0 15.3333 0 12C0 8.66667 1.16667 5.83333 3.5 3.5C5.83333 1.16667 8.66667 0 12 0C12.3111 0 12.6169 0.0111112 12.9173 0.0333335C13.2178 0.0555557 13.512 0.0888888 13.8 0.133333C12.8889 0.777778 12.1609 1.61689 11.616 2.65067C11.0711 3.68444 10.7991 4.80089 10.8 6C10.8 8 11.5 9.7 12.9 11.1C14.3 12.5 16 13.2 18 13.2C19.2222 13.2 20.3444 12.9276 21.3667 12.3827C22.3889 11.8378 23.2222 11.1102 23.8667 10.2C23.9111 10.4889 23.9444 10.7831 23.9667 11.0827C23.9889 11.3822 24 11.688 24 12C24 15.3333 22.8333 18.1667 20.5 20.5C18.1667 22.8333 15.3333 24 12 24ZM12 21.3333C13.9556 21.3333 15.7111 20.7942 17.2667 19.716C18.8222 18.6378 19.9556 17.2324 20.6667 15.5C20.2222 15.6111 19.7778 15.7 19.3333 15.7667C18.8889 15.8333 18.4444 15.8667 18 15.8667C15.2667 15.8667 12.9387 14.9053 11.016 12.9827C9.09333 11.06 8.13245 8.73244 8.13333 6C8.13333 5.55556 8.16667 5.11111 8.23333 4.66667C8.3 4.22222 8.38889 3.77778 8.5 3.33333C6.76667 4.04444 5.36089 5.17778 4.28267 6.73333C3.20444 8.28889 2.66578 10.0444 2.66667 12C2.66667 14.5778 3.57778 16.7778 5.4 18.6C7.22222 20.4222 9.42222 21.3333 12 21.3333Z"
                  fill="#DADADA"
                  variants={boxVariants}
                />
              )}
            </motion.svg>
          </div>
        </div>
        {open && (
          <ListMusic
            playList={playingList}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
          />
        )}
        <div onClick={() => setOpen(!open)} className="absolute bottom-2">
          <motion.svg
            initial={false}
            animate={open ? "open" : "close"}
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="focus:outline-none"
          >
            <motion.path
              transition={{ duration: 0.7, ease: [0.04, 0.62, 0.23, 0.98] }}
              d="M19.1 2.875L10.7 11.3C10.6 11.4 10.4917 11.471 10.375 11.513C10.2583 11.555 10.1333 11.5757 10 11.575C9.86667 11.575 9.74167 11.5543 9.625 11.513C9.50834 11.4717 9.4 11.4007 9.3 11.3L0.875001 2.875C0.641668 2.64167 0.525001 2.35 0.525001 2C0.525001 1.65 0.650001 1.35 0.900001 1.1C1.15 0.850001 1.44167 0.725001 1.775 0.725001C2.10833 0.725001 2.4 0.850001 2.65 1.1L10 8.45L17.35 1.1C17.5833 0.866667 17.871 0.75 18.213 0.75C18.555 0.75 18.8507 0.875 19.1 1.125C19.35 1.375 19.475 1.66667 19.475 2C19.475 2.33333 19.35 2.625 19.1 2.875Z"
              className="fill-[#424040] dark:fill-white"
              variants={{ open: { rotate: 180 } }}
            />
          </motion.svg>
        </div>
      </motion.div>
      {!open && (
        <div className="mt-36 flex justify-center">
          <Image
            className="w-4/5 rounded-3xl object-contain shadow-lg "
            loading="lazy"
            src={playingList[currentSong].imgSrc}
            alt={""}
            width="0"
            height="0"
            sizes="100vw"
          />
        </div>
      )}
      {open ? (
        <div className="fixed inset-x-0 bottom-0 flex flex-col items-center rounded-t-[50px] border-x border-t border-white bg-white bg-opacity-30 pb-5 backdrop-blur-sm dark:border-none dark:bg-black dark:bg-opacity-70">
          <div className="mt-6 h-[5px] w-32 rounded-full bg-black bg-opacity-50 backdrop-blur-sm dark:bg-white dark:bg-opacity-70" />
          <div className="mt-4 mb-4 flex w-full items-center justify-between px-12">
            <div className="flex flex-col items-start dark:text-white">
              <span className="text-left text-xl font-semibold">
                {playingList[currentSong].title}
              </span>
              <span className="text-xl opacity-70">Mercury Album</span>
            </div>
            <Image
              className="w-16 rounded-xl object-contain "
              loading="lazy"
              src={playingList[currentSong].imgSrc}
              alt={""}
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <ProgressBar
            progressBarRef={progressBarRef}
            audioPlayer={audioPlayer}
            musicList={musicList}
            setPlayingList={setPlayingList}
            repeatSong={repeatSong}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            playAnimationRef={playAnimationRef}
            setRepeatSong={setRepeatSong}
            duration={duration}
            setTime={setTime}
            time={time}
            small
          />
          <Controls
            playPause={playPause}
            IsplayMusic={IsplayMusic}
            audioPlayer={audioPlayer}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            musicList={musicList}
          />
        </div>
      ) : (
        <div className="fixed inset-x-0 bottom-0 flex flex-col items-center rounded-t-[50px] border-x border-t border-white bg-white bg-opacity-30 pb-16 backdrop-blur-sm dark:border-none dark:bg-black dark:bg-opacity-70">
          <div className="mt-6 h-[5px] w-32 rounded-full  bg-black bg-opacity-50 backdrop-blur-sm dark:bg-white dark:bg-opacity-70" />
          <span className="mt-6 text-center text-[28px] font-semibold dark:text-white">
            {playingList[currentSong].title}
          </span>
          <span className="text-xl opacity-70 dark:text-white">
            Mercury Album
          </span>
          <ProgressBar
            progressBarRef={progressBarRef}
            audioPlayer={audioPlayer}
            musicList={musicList}
            setPlayingList={setPlayingList}
            repeatSong={repeatSong}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            playAnimationRef={playAnimationRef}
            setRepeatSong={setRepeatSong}
            duration={duration}
            setTime={setTime}
            time={time}
          />
          <Controls
            playPause={playPause}
            IsplayMusic={IsplayMusic}
            audioPlayer={audioPlayer}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            musicList={musicList}
          />
        </div>
      )}
    </div>
  );
}
