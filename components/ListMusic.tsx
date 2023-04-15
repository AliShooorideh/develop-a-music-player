import Image from "next/image";
import { useRef } from "react";

interface Iitem {
  playList: Array<{ title: string; srcMusic: string; imgSrc: string }>;
  setCurrentSong: any;
  currentSong: number;
}
export default function ListMusic(item: Iitem) {
  return (
    <div className="mt-3 flex w-full flex-col space-y-6 overflow-y-scroll px-12">
      {item.playList.map((ele, index) => (
        <div
          className="flex items-center space-x-4"
          onClick={() => item.setCurrentSong(index)}
        >
          <Image
            className="w-20 rounded-xl object-contain "
            loading="lazy"
            src={ele.imgSrc}
            alt={""}
            width="0"
            height="0"
            sizes="100vw"
          />
          <div className="flex flex-col text-left dark:text-white">
            <span className="font-bold">{ele.title}</span>
            <span>Album</span>
          </div>
        </div>
      ))}
    </div>
  );
}
