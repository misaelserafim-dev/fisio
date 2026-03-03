"use client";
import "./VideoClickPlay.scss";
import { FC, useRef, useState } from "react";

interface videoProps {
  video: {
    url: string;
    mime_type: string;
  };
  poster?: {
    url: string;
  };
}

const VideoClickPlay: FC<videoProps> = ({ poster, video }) => {
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.pause();
        setIsActive(false);
      } else {
        videoRef.current.play();
        setIsActive(true);
      }
    }
  };

  return (
    <div className={`videoClickPlay ${isActive && "active"}`} onClick={() => handleClick()}>
      <video className="videoClickPlay__emphasis" poster={poster?.url} ref={videoRef}>
        <source src={video?.url} type={video?.mime_type} />
      </video>
    </div>
  );
};

export default VideoClickPlay;
