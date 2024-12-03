'use client';
import React from 'react';

interface EmbedPlayerProps {
  url: string;
}

function EmbedPlayer(props: EmbedPlayerProps) {
  const ref = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    // Dynamically add the Umami script
    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://cloud.umami.is/script.js';
    script.setAttribute('data-website-id', '452e67ed-091a-4c13-a9ca-51262d63839a');
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.src = props.url;
    }

    const iframe: HTMLIFrameElement | null = ref.current;
    iframe?.addEventListener('load', handleIframeLoaded);

    return () => {
      iframe?.removeEventListener('load', handleIframeLoaded);
    };
  }, [props.url]);

  const handleIframeLoaded = () => {
    if (!ref.current) {
      return;
    }
    const iframe: HTMLIFrameElement = ref.current;
    if (iframe) iframe.style.opacity = '1';
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#000',
      }}>
      <iframe
        ref={ref}
        width="100%"
        height="100%"
        allowFullScreen
        style={{ opacity: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default EmbedPlayer;
