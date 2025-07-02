'use client';

import { useEffect, useState } from 'react';

const VideoHero = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="absolute w-full h-full overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/J-Lpp53_QSI?si=aqy85DogHB5_1846&autoplay=1&mute=1&loop=1&playlist=J-Lpp53_QSI&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=1&vq=hd1080"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen={false}
        className="absolute brightness-[0.6] pointer-events-none"
        style={{
          border: 'none',
          width: '100vw',
          height: '56.25vw', // 16:9 aspect ratio based on viewport width
          minHeight: '100vh',
          minWidth: '177.78vh', // 16:9 aspect ratio based on viewport height
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Overlay to disable interactions */}
      <div className="absolute inset-0 bg-transparent pointer-events-none" />
    </div>
  );
};

export default VideoHero;