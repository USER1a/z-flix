import React from 'react';
import EmbedPlayer from '@/components/watch/embed-player';

export const revalidate = 3600;

export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop();

  // Get the current hour in 24-hour format
  const currentHour = new Date().getHours();

  // Define URLs for day and night
  const dayUrl = `https://vidbinge.dev/embed/movie/${id}`;
  const nightUrl = `https://vidsrc.me/embed/movie/${id}?autoPlay=true`;

  // Determine whether it is day or night
  const isDaytime = currentHour >= 6 && currentHour < 23; // Example: 6 AM to 11 PM is daytime

  // Select the appropriate URL
  const embedUrl = isDaytime ? dayUrl : nightUrl;

  return <EmbedPlayer url={embedUrl} />;
}


  //return <EmbedPlayer url={https://embed.su/embed/movie/${id}} />;
  //return <EmbedPlayer url={https://vidbinge.dev/embed/movie/${id}} />;
  //return <EmbedPlayer url={https://player.vidsrc.nl/embed/movie/${id}} />;
  //return <EmbedPlayer url={https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=true} />;
  //return <EmbedPlayer url={https://vidsrc.me/embed/movie/${id}?autoPlay=true} />;
  
