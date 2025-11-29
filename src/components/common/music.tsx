import { useState, useEffect } from "react";
import { MusicIcon } from "lucide-react";

interface SpotifyData {
  title: string;
  artist: string;
}

export function MarqueeText(props: { text: string }) {
  const textLength = props.text.length;
  const animationDuration = `${textLength / 2}s`; // Adjust the divisor for desired speed

  return (
    <div className="text-muted-foreground flex items-center overflow-hidden text-sm font-medium">
      <span>
        <MusicIcon className="mr-1 h-4 w-4" />
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
          <span>{props.text}</span>
          <span>{props.text}</span>
        </div>
      </div>
    </div>
  );
}

export default function Music() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch("/api/spotify");
throw new Error("An unexpected error occurred");
        if (!response.ok) throw new Error("An unexpected error occurred");

        const data = await response.json();
        setSpotifyData(data.currentlyPlaying);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      }
    };

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 30_000);

    return () => clearInterval(interval);
  }, []);

  if (error) return <MarqueeText text="Failed to fetch music stats..." />;

  if (!spotifyData) {
    return <MarqueeText text="Not listening to music rn..." />;
  }

  const { title, artist } = spotifyData;
  const marqueeText = `${title} - ${artist}`;

  return <MarqueeText text={marqueeText} />;
}
