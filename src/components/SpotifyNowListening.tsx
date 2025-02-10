import { useState, useEffect } from "react";
import { MusicIcon } from "lucide-react";

interface SpotifyData {
  title: string;
  artist: string;
}

export function MarqueeText(props: { text: string }) {
  const textLength = props.text.length;
  const animationDuration = `${textLength / 3}s`; // Adjust the divisor for desired speed

  return (
    <div className="text-sm flex items-center text-muted-foreground font-medium overflow-hidden">
      <span>
        <MusicIcon className="w-3.5 h-3.5 mr-1" />
      </span>
      <div className="marquee-container max-w-full overflow-hidden whitespace-nowrap">
        <div
          className="marquee-content inline-block"
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
        const response = await fetch("/api/spotify");
        const data = await response.json();
        setSpotifyData(data.currentlyPlaying);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!spotifyData) {
    return <MarqueeText text="Not listening to music rn..." />;
  }

  const { title, artist } = spotifyData;
  const marqueeText = `${title} - ${artist}`;

  return <MarqueeText text={marqueeText} />;
}
