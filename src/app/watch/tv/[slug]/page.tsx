import React from 'react';
import EmbedPlayer from '@/components/watch/embed-player';

export const revalidate = 3600;

export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop();
 
  //return <EmbedPlayer url={`https://embed.su/embed/tv/${id}/1/1`} />;
  return <EmbedPlayer url={`https://vidbinge.dev/embed/tv/${id}/${1}/${1}`} />;
  //return <EmbedPlayer url={`  https://flicky.host/embed/tv/${id}/{1}/{1}`} />;
}
