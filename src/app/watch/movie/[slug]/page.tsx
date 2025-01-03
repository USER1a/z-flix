import React, { useState } from 'react';
import EmbedPlayer from '@/components/watch/embed-player';

export const revalidate = 3600;

const sources = [
  { name: "Flicky", url: (id: string) => `https://flicky.host/embed/movie/?id=${id}` },
  { name: "VidBinge", url: (id: string) => `https://vidbinge.dev/embed/movie/${id}` },
  { name: "VidLink", url: (id: string) => `https://vidlink.pro/movie/${id}?primaryColor=63b8bc&secondaryColor=a2a2a2&iconColor=eefdec&icons=vid&player=default&title=true&poster=true&autoplay=true&nextbutton=false` },
  { name: "EmbedSu", url: (id: string) => `https://embed.su/embed/movie/${id}` },
  { name: "Vidsrc.nl", url: (id: string) => `https://player.vidsrc.nl/embed/movie/${id}` },
  { name: "Vidsrc.cc", url: (id: string) => `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=true` },
  { name: "Vidsrc.me", url: (id: string) => `https://vidsrc.me/embed/movie/${id}?autoPlay=true` },
];

export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop()!;
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  return (
    <div>
      <h1>Choose a Source</h1>
      <div style={{ marginBottom: '20px' }}>
        {sources.map((source, index) => (
          <button
            key={index}
            onClick={() => setSelectedSource(source.url(id))}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: '#63b8bc',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {source.name}
          </button>
        ))}
      </div>
      {selectedSource ? (
        <EmbedPlayer url={selectedSource} />
      ) : (
        <p>Please select a source to watch the movie.</p>
      )}
    </div>
  );
}
