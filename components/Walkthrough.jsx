"use client"

import React from 'react';
import { useEffect, useState } from 'react';

// Helper function to extract video ID from a YouTube URL
function extractVideoId(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

export default function WalkthroughVideo({ virtualDataArray }) {
  const [walkthroughVideoUrl, setWalkthroughVideoUrl] = useState('');

  useEffect(() => {
    let videoId = '';
    videoId = extractVideoId(virtualDataArray);

    if (videoId) {
      const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&enablejsapi=1&controls=1&cc_load_policy=0`;
      setWalkthroughVideoUrl(youtubeEmbedUrl);
    }
  }, [virtualDataArray]);

  if (!walkthroughVideoUrl) {
    return null; // or a loader / placeholder
  }

  return (
    <iframe
      id="youtubeIframe"
      style={{ width: '100%', display: 'block' }}
      src={walkthroughVideoUrl}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
