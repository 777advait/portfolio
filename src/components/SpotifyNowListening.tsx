import { useState, useEffect } from "react";
import { MusicIcon } from "lucide-react";

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

function MarqueeText(props: { text: string }) {
  const textLength = props.text.length;
  const animationDuration = `${textLength / 3}s`; // Adjust the divisor for desired speed

  return (
    <div className="text-sm flex items-center text-muted-foreground font-medium md:text-base overflow-hidden">
      <span>
        <MusicIcon className="w-3.5 h-3.5 mr-1" />
      </span>
      <div className="marquee-container">
        <div
          className="marquee-content"
          style={{ animationDuration: animationDuration }}
        >
          <span>{props.text}</span>
          <span>{props.text}</span>
          <span>{props.text}</span>
          <span>{props.text}</span>
        </div>
      </div>
    </div>
  );
}

export default function SpotifyNowListening() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch("/api/spotify-now-playing");
        const data = await response.json();
        setSpotifyData(data);
      } catch (error) {
        return <MarqueeText text="Error fetching data..." />;
      }
    };

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!spotifyData || !spotifyData?.isPlaying) {
    return <MarqueeText text="Not listening to music rn..." />;
  }

  const { title, artist } = spotifyData;
  const marqueeText = `${title} - ${artist}`;

  return <MarqueeText text={marqueeText} />;
}
