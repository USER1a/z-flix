import React from 'react';
import EmbedPlayer from '@/components/watch/embed-player';

export const revalidate = 3600;

export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop();

  // Get the current hour (0-23)
  const currentHour = new Date().getHours();

  // Determine whether it's morning (6 AM to 6 PM) or nighttime
  const isDaytime = currentHour >= 6 && currentHour < 18;

  // Swap the URLs for daytime and nighttime
  const embedUrl = isDaytime
    ? `https://vidbinge.dev/embed/movie/${id}` // Daytime
    : `https://player.vidsrc.nl/embed/movie/${id}`; // Nighttime

  return <EmbedPlayer url={embedUrl} />;




  //return <EmbedPlayer url={`https://player.vidsrc.nl/embed/movie/${id}`} />;
  //return <EmbedPlayer url={`https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=true`} />;
  //return <EmbedPlayer url={`https://vidsrc.me/embed/movie/${id}?autoPlay=true`} />;
}
