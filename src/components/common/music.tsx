import { MusicIcon } from "lucide-react";
import { useEffect, useState } from "react";

const LANYARD_USER_ID = "776348276802584576";
const POLL_INTERVAL = 30_000;

type LanyardActivity = {
  name: string;
  type: number;
  details?: string;
  state?: string;
  assets?: { large_text?: string; small_text?: string };
};

type LanyardResponse = {
  success: boolean;
  data: {
    activities: LanyardActivity[];
    listening_to_spotify: boolean;
    spotify: { song: string; artist: string } | null;
  };
};

function nowPlaying(data: LanyardResponse["data"]): string | null {
  // Apple Music comes through as a "listening" (type 2) rich presence activity
  const apple = data.activities?.find(
    (activity) => activity.type === 2 && activity.name === "Apple Music",
  );
  if (apple?.details) {
    return apple.state ? `${apple.details} - ${apple.state}` : apple.details;
  }

  if (data.listening_to_spotify && data.spotify) {
    return `${data.spotify.song} - ${data.spotify.artist}`;
  }

  return null;
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
  const [track, setTrack] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function poll() {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${LANYARD_USER_ID}`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const json: LanyardResponse = await res.json();
        if (json.success) setTrack(nowPlaying(json.data));
      } catch {
        // network hiccup or unmount — keep the last known state
      }
    }

    poll();
    const id = setInterval(poll, POLL_INTERVAL);

    return () => {
      controller.abort();
      clearInterval(id);
    };
  }, []);

  return <MarqueeText text={track ?? "Not listening to music rn..."} />;
}
