'use client';

import { useEffect, useState } from 'react';

const VideoHero = () => {
  const [isClient, setIsClient] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now());

  useEffect(() => {
    setIsClient(true);
    
    // Ensure we're on HTTPS in production
    if (typeof window !== 'undefined' && window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
      console.warn('YouTube embeds require HTTPS. Consider switching to HTTPS for better compatibility.');
    }
    
    // Update timestamp every 30 seconds to force refresh if needed
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleVideoError = () => {
    console.log('Video embed failed, retry count:', retryCount);
    if (retryCount < 4) {
      setRetryCount(prev => prev + 1);
      setCurrentTimestamp(Date.now());
      // Try again after 3 seconds
      setTimeout(() => {
        setVideoError(false);
      }, 3000);
    } else {
      setVideoError(true);
      console.error('All video embed attempts failed. Check YouTube video settings.');
    }
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setRetryCount(0);
  };

  // Multiple strategies for different retry attempts
  const getVideoUrl = () => {
    const videoId = "vc0Toj_QB_c";
    const baseParams = "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=0&vq=hd1080";
    const playlistParam = `&playlist=${videoId}`;
    const timestamp = `&_t=${currentTimestamp}`;
    const origin = typeof window !== 'undefined' && window.location.origin !== 'null' 
      ? `&origin=${encodeURIComponent(window.location.origin)}` 
      : '';
    
    switch (retryCount) {
      case 0:
        // Standard YouTube embed
        return `https://www.youtube.com/embed/${videoId}?${baseParams}${playlistParam}${timestamp}`;
      
      case 1:
        // YouTube NoCoookie (privacy-enhanced mode)
        return `https://www.youtube-nocookie.com/embed/${videoId}?${baseParams}${playlistParam}${timestamp}`;
      
      case 2:
        // Standard YouTube with origin parameter
        return `https://www.youtube.com/embed/${videoId}?${baseParams}${playlistParam}${origin}${timestamp}`;
      
      case 3:
        // YouTube NoCoookie with origin parameter
        return `https://www.youtube-nocookie.com/embed/${videoId}?${baseParams}${playlistParam}${origin}${timestamp}`;
      
      case 4:
        // Final attempt with minimal parameters
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}${timestamp}`;
      
      default:
        return `https://www.youtube.com/embed/${videoId}?${baseParams}${playlistParam}${timestamp}`;
    }
  };

  const handleRetryManually = () => {
    setVideoError(false);
    setRetryCount(0);
    setCurrentTimestamp(Date.now());
  };

  // Test with a known embeddable video for debugging
  const testWithKnownVideo = () => {
    window.open('https://www.youtube.com/embed/dQw4w9WgXcQ', '_blank');
  };

  if (!isClient) return null;

  return (
    <div className="absolute w-full h-full overflow-hidden">
      {!videoError ? (
        <iframe
          key={`${retryCount}-${currentTimestamp}`} // Force re-render on retry and timestamp change
          src={getVideoUrl()}
          title="Hero Video"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={false}
          referrerPolicy="no-referrer-when-downgrade"
          onError={handleVideoError}
          onLoad={handleVideoLoad}
          className="absolute brightness-[0.6] pointer-events-none"
          style={{
            border: 'none',
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.78vh',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : (
        // Enhanced fallback background when video fails
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.6)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-md mx-auto p-6">
              <h2 className="text-2xl font-bold mb-4">Video Temporarily Unavailable</h2>
              <p className="text-lg opacity-80 mb-6">
                The YouTube video cannot be embedded at the moment.
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={handleRetryManually}
                  className="w-full px-6 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all font-medium"
                >
                  🔄 Try Again
                </button>
                
                <button 
                  onClick={() => window.open('https://www.youtube.com/watch?v=vc0Toj_QB_c', '_blank')}
                  className="w-full px-6 py-3 bg-red-600 bg-opacity-80 rounded-lg hover:bg-opacity-90 transition-all font-medium"
                >
                  ▶️ Watch on YouTube
                </button>
                
                {process.env.NODE_ENV === 'development' && (
                  <button 
                    onClick={testWithKnownVideo}
                    className="w-full px-6 py-3 bg-yellow-600 bg-opacity-80 rounded-lg hover:bg-opacity-90 transition-all font-medium text-sm"
                  >
                    🧪 Test with Known Video
                  </button>
                )}
              </div>
              
              <p className="text-xs opacity-60 mt-4">
                Retry attempt: {retryCount}/4
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay to disable interactions */}
      <div className="absolute inset-0 bg-transparent pointer-events-none" />
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 z-50 bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs max-w-xs">
          <div><strong>Debug Info:</strong></div>
          <div>Retry: {retryCount}/4</div>
          <div>Error: {videoError ? '❌' : '✅'}</div>
          <div>Protocol: {typeof window !== 'undefined' ? window.location.protocol : 'N/A'}</div>
          <div>Host: {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}</div>
          <div className="mt-2 text-yellow-300">
            Current URL: {!videoError ? getVideoUrl().substring(0, 60) + '...' : 'N/A'}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoHero;