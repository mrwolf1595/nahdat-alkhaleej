'use client';
import { useState, useEffect } from 'react';

interface CustomYouTubePlayerProps {
  videoId: string;
  autoplay?: boolean;
}

const CustomYouTubePlayer = ({ videoId, autoplay = true }: CustomYouTubePlayerProps) => {
  const [processedVideoId, setProcessedVideoId] = useState<string | null>(null);
  
  // Extract video ID from various YouTube URL formats
  useEffect(() => {
    if (!videoId) {
      console.warn('No video ID provided');
      return;
    }
    
    console.log('Processing video ID:', videoId);
    
    /* spellchecker: disable */
    // If it's already an ID (11 characters without youtube.com or youtu.be)
    /* spellchecker: enable */
    if (videoId.length === 11 && !videoId.includes('/') && !videoId.includes('.')) {
      setProcessedVideoId(videoId);
      console.log('Using direct video ID:', videoId);
      return;
    }
    
    // Handle different YouTube URL formats
    /* spellchecker: disable */
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    /* spellchecker: enable */
    const match = videoId.match(regExp);
    
    if (match && match[2].length === 11) {
      setProcessedVideoId(match[2]);
      console.log('Extracted video ID:', match[2]);
    } else {
      console.warn('Invalid YouTube URL or ID:', videoId);
      setProcessedVideoId(null);
    }
  }, [videoId]);
  
  if (!processedVideoId) {
    console.warn('Could not process video ID');
    return null; // Don't render anything if we couldn't process a valid video ID
  }
  
  // For better user experience, we always render the iframe directly
  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-black">
      <div className="aspect-video">
        <iframe
          className="w-full h-full"
         src={`https://www.youtube.com/embed/${processedVideoId}?autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 1 : 0}&playsinline=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default CustomYouTubePlayer;