import { useRef } from "react";

interface Iitem {
  playPause: boolean;
  IsplayMusic: any;
  audioPlayer: any;
  currentSong: number;
  setCurrentSong: any;
  musicList: Array<{ title: string; srcMusic: string; imgSrc: string }>;
}
export default function Controls(item: Iitem) {
  const handleTime = (ele: string) => {
    if (item.audioPlayer?.current.currentTime != undefined) {
      if (ele === "back") {
        item.audioPlayer.current.currentTime =
          item.audioPlayer.current.currentTime - 10;
      } else {
        item.audioPlayer.current.currentTime =
          item.audioPlayer.current.currentTime + 10;
      }
    }
  };
  const handleMusic = (ele: string) => {
    if (ele === "next") {
      if (item.currentSong != item.musicList.length - 1) {
        item.setCurrentSong(item.currentSong + 1);
      } else {
        item.setCurrentSong(0);
      }
    }
    if (ele === "back") {
      if (item.currentSong != 0) {
        item.setCurrentSong(item.currentSong - 1);
      } else {
        item.setCurrentSong(item.musicList.length - 1);
      }
    }
  };
  return (
    <div className="mt-3 flex w-3/5 items-center justify-between">
      <div className="relative" onClick={() => handleTime("back")}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.0585 2.9405C18.1154 3.98929 18.9235 5.26239 19.4232 6.6658C19.9228 8.06921 20.1012 9.56707 19.9453 11.0488C19.4829 15.641 15.7588 19.4198 11.1723 19.9329C5.11129 20.6211 1.77959e-07 15.9288 4.36667e-07 10.0102C-1.38809e-06 8.12066 0.535473 6.26988 1.54422 4.6729C2.55296 3.07593 3.99356 1.79832 5.69865 0.98851C6.53595 0.588102 7.49822 1.18871 7.49822 2.11466C7.49822 2.57763 7.24828 3.01558 6.83588 3.21578C5.27497 3.94227 4.01157 5.18484 3.25821 6.73448C2.50485 8.28411 2.3075 10.0463 2.69936 11.7245C3.31171 14.5023 5.57368 16.7421 8.34802 17.3302C9.44493 17.5774 10.5833 17.5745 11.679 17.3218C12.7746 17.0691 13.7995 16.573 14.6779 15.8701C15.5562 15.1673 16.2655 14.2758 16.7533 13.2615C17.241 12.2471 17.4948 11.136 17.4958 10.0102C17.4958 7.9331 16.6336 6.08121 15.2714 4.72983L13.3843 6.61926C12.597 7.40756 11.2473 6.857 11.2473 5.74336L11.2473 1.25128C11.2473 0.563074 11.8097 -3.58009e-07 12.497 -3.27965e-07L16.9835 -1.31857e-07C18.0957 -8.32393e-08 18.6581 1.35138 17.8708 2.13968L17.0585 2.9405Z"
            className="fill-[#424040] dark:fill-white"
          />
        </svg>
        <span className="absolute top-1 left-[6px] text-[9px] font-semibold opacity-80 dark:text-white">
          10
        </span>
      </div>

      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => handleMusic("back")}
      >
        <path
          d="M25.5221 27.0172L11.3894 17.0484C10.0178 16.0687 10.0178 14.0113 11.3894 13.056L25.5221 3.06275C27.1631 1.93606 29.392 3.08725 29.392 5.07121V25.0088C29.392 26.9927 27.1631 28.1439 25.5221 27.0172ZM4.89866 2.79333V27.2867C4.89866 28.6338 3.79646 29.736 2.44933 29.736C1.1022 29.736 -3.8147e-06 28.6338 -3.8147e-06 27.2867V2.79333C-3.8147e-06 1.44619 1.1022 0.343994 2.44933 0.343994C3.79646 0.343994 4.89866 1.44619 4.89866 2.79333Z"
          className="fill-[#424040] dark:fill-white"
        />
      </svg>

      {item.playPause ? (
        <div
          onClick={item.IsplayMusic}
          className="box-content h-[36px] w-2 border-x-8 border-x-[#424040] dark:border-x-white "
        />
      ) : (
        <div
          onClick={item.IsplayMusic}
          className="box-content h-0 w-0 border-y-[18px] border-l-[25px] border-y-transparent border-l-[#424040] dark:border-l-white"
        />
      )}
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => handleMusic("next")}
      >
        <path
          d="M4.47795 27.0172L18.6106 17.0484C19.9822 16.0687 19.9822 14.0113 18.6106 13.056L4.47795 3.06275C2.83689 1.93606 0.608002 3.08725 0.608002 5.07121V25.0088C0.608002 26.9927 2.83689 28.1439 4.47795 27.0172ZM25.1013 2.79333V27.2867C25.1013 28.6338 26.2035 29.736 27.5507 29.736C28.8978 29.736 30 28.6338 30 27.2867V2.79333C30 1.44619 28.8978 0.343994 27.5507 0.343994C26.2035 0.343994 25.1013 1.44619 25.1013 2.79333Z"
          className="fill-[#424040] dark:fill-white"
        />
      </svg>

      <div className="relative" onClick={() => handleTime("next")}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.94155 2.9405C1.88463 3.98929 1.0765 5.26239 0.576845 6.6658C0.077185 8.06921 -0.101245 9.56707 0.0547318 11.0488C0.517122 15.641 4.24124 19.4198 8.82765 19.9329C14.8887 20.6211 20 15.9288 20 10.0102C20 8.12066 19.4645 6.26988 18.4558 4.6729C17.447 3.07593 16.0064 1.79832 14.3014 0.98851C13.4641 0.588102 12.5018 1.18871 12.5018 2.11466C12.5018 2.57763 12.7517 3.01558 13.1641 3.21578C14.725 3.94227 15.9884 5.18484 16.7418 6.73448C17.4951 8.28411 17.6925 10.0463 17.3006 11.7245C16.6883 14.5023 14.4263 16.7421 11.652 17.3302C10.5551 17.5774 9.41668 17.5745 8.32102 17.3218C7.22536 17.0691 6.20046 16.573 5.32213 15.8701C4.44381 15.1673 3.73452 14.2758 3.24675 13.2615C2.75897 12.2471 2.50518 11.136 2.50415 10.0102C2.50415 7.9331 3.36645 6.08121 4.72862 4.72983L6.61568 6.61926C7.40299 7.40756 8.75267 6.857 8.75267 5.74336L8.75267 1.25128C8.75267 0.563074 8.1903 -3.58009e-07 7.50296 -3.27965e-07L3.01653 -1.31857e-07C1.90429 -8.32393e-08 1.34193 1.35138 2.12924 2.13968L2.94155 2.9405Z"
            className="fill-[#424040] dark:fill-white"
          />
        </svg>
        <span className="absolute top-1 right-[6px] text-[9px] font-semibold opacity-80 dark:text-white">
          10
        </span>
      </div>
    </div>
  );
}
