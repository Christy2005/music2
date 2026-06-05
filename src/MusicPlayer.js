import React from 'react';

export default function MusicPlayer({ videoUrl }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Your mood-based surprise music:</h3>
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
}
