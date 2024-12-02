import Hero from '@/components/hero';
import ShowsContainer from '@/components/shows-container';
import { MediaType, type Show } from '@/types';
import { siteConfig } from '@/configs/site';
import { RequestType, type ShowRequest } from '@/enums/request-type';
import MovieService from '@/services/MovieService';
import { Genre } from '@/enums/genre';
import { getRandomShow } from '@/lib/utils';

export const revalidate = 3600;

export default async function Home() {
  const h1 = `${siteConfig.name} Home`;
  const requests: ShowRequest[] = [
    {
      title: 'Trending Now',
      req: { requestType: RequestType.TRENDING, mediaType: MediaType.ALL },
      visible: true,
    },
    {
      title: 'Netflix TV Shows',
      req: { requestType: RequestType.NETFLIX, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Popular TV Shows',
      req: {
        requestType: RequestType.TOP_RATED,
        mediaType: MediaType.TV,
        genre: Genre.TV_MOVIE,
      },
      visible: true,
    },
    {
      title: 'Korean Movies',
      req: {
        requestType: RequestType.KOREAN,
        mediaType: MediaType.MOVIE,
        genre: Genre.THRILLER,
      },
      visible: true,
    },
    {
      title: 'Comedy Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.COMEDY,
      },
      visible: true,
    },
    {
      title: 'Action Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.ACTION,
      },
      visible: true,
    },
    {
      title: 'Romance Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.ROMANCE,
      },
      visible: true,
    },
    {
      title: 'Scary Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.THRILLER,
      },
      visible: true,
    },
  ];
  const allShows = await MovieService.getShows(requests);
  const randomShow: Show | null = getRandomShow(allShows);
  return (
    <>
      <h1 className="hidden">{h1}</h1>
      <Hero randomShow={randomShow} />
      <ShowsContainer shows={allShows} />
    </>
  );
}
{/* Ad Script */}
          <Script
            id="ad-script"
            dangerouslySetInnerHTML={{
              __html: `
          /*<![CDATA[*/
          (function(){
            var h=window,i="c45fdd13b81808e704f8cec79d2fdcd7",
            o=[["siteId",25*424*374+1190413],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],
            y=["d3d3LmRpc3BsYXl2ZXJ0aXNpbmcuY29tL2tqcy15YW1sLm1pbi5jc3M=","ZDNtem9rdHk5NTFjNXcuY2xvdWRmcm9udC5uZXQveGpLQ0YvZ1VQTkcubWluLmpz"],
            r=-1,e,p,x=function(){
              clearTimeout(p);
              r++;
              if(y[r]&&!(1758997146000<(new Date).getTime()&&1<r)){
                e=h.document.createElement("script");
                e.type="text/javascript";
                e.async=!0;
                var t=h.document.getElementsByTagName("script")[0];
                e.src="https://"+atob(y[r]);
                e.crossOrigin="anonymous";
                e.onerror=x;
                e.onload=function(){
                  clearTimeout(p);
                  h[i.slice(0,16)+i.slice(0,16)]||x()
                };
                p=setTimeout(x,5E3);
                t.parentNode.insertBefore(e,t)
              }
            };
            if(!h[i]){
              try{
                Object.freeze(h[i]=o)
              }catch(e){}
              x()
            }
          })();
          /*]]>*/
          `,
            }}
          />
