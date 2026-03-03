"use client";
import "./VideoAutoPlay.scss";
import { MediaAcf } from "@/@types/media";
import { FC, useEffect, useRef, useState } from "react";

type VideoAutoPlayProps = {
  video: MediaAcf;
  videoMobile: MediaAcf;
  containerClass: string;
  poster?: string;
} & React.ComponentProps<"div">;

const VideoAutoPlay: FC<VideoAutoPlayProps> = ({ containerClass, video, poster, videoMobile }) => {
  if (!video) return null;

  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const postUrl = poster ? poster : "/images/placeholder.webp";

  useEffect(() => {
    const targetElement = document.querySelector(`.${containerClass}`);
    if (!targetElement) return;

    const checkActiveAndToggleVideo = () => {
      const isNowActive = targetElement.classList.contains("active");
      if (isNowActive && videoRef.current && !isActive) {
        videoRef.current.play();
        setIsActive(true);
      } else if (!isNowActive && videoRef.current && isActive) {
        videoRef.current.pause();
        setIsActive(false);
      }
    };

    const observer = new MutationObserver(checkActiveAndToggleVideo);
    observer.observe(targetElement, { attributes: true, attributeFilter: ["class"] });
    checkActiveAndToggleVideo();

    return () => {
      observer.disconnect();
    };
  }, [isActive]);

  return (
    <div className="videoAutoPlay" ref={containerRef}>
      <video className="videoAutoPlay__emphasis" poster={postUrl} ref={videoRef} preload="auto" playsInline autoPlay loop muted>
        <source media="(min-width:769px)" src={video?.url} type={video?.mime_type} />
        <source media="(max-width:768px)" src={videoMobile?.url} type={videoMobile?.mime_type} />
      </video>
    </div>
  );
};

export default VideoAutoPlay;
