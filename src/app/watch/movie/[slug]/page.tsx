import React from 'react';
import EmbedPlayer from '@/components/watch/embed-player';

export const revalidate = 3600;

export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop();
  //return <EmbedPlayer url={`https://embed.su/embed/movie/${id}`} />;
  return <EmbedPlayer url={`https://vidlink.pro/movie/${mediaId}?primaryColor=${primaryColor}&secondaryColor=${secondaryColor}&iconColor=${iconColor}&autoplay=false`} />;
  
}
