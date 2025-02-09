import type { APIRoute } from "astro";

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_TOP_TRACKS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5";
const SPOTIFY_RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=50";

const getAccessToken = async () => {
  const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;
  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${import.meta.env.SPOTIFY_CLIENT_ID}:${import.meta.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get access token");
  }

  return response.json();
};

const fetchSpotifyData = async (endpoint: string, access_token: string) => {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  return response.json();
};

export const GET: APIRoute = async () => {
  try {
    const { access_token } = await getAccessToken();

    // Fetch Currently Playing Song
    let currentlyPlaying = await fetchSpotifyData(
      SPOTIFY_NOW_PLAYING_ENDPOINT,
      access_token
    ).catch(() => null);
    const isPlaying = currentlyPlaying?.is_playing || false;
    const currentSong = isPlaying
      ? {
          title: currentlyPlaying.item.name,
          artist: currentlyPlaying.item.artists
            .map((artist: any) => artist.name)
            .join(", "),
          album: currentlyPlaying.item.album.name,
          albumImageUrl: currentlyPlaying.item.album.images[0].url,
          songUrl: currentlyPlaying.item.external_urls.spotify,
        }
      : null;

    // Fetch Top 5 Songs This Month (short_term)
    const topTracksData = await fetchSpotifyData(
      SPOTIFY_TOP_TRACKS_ENDPOINT,
      access_token
    );
    const topTracks = topTracksData.items.map((track: any) => ({
      title: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(", "),
      album: track.album.name,
      albumImageUrl: track.album.images[0].url,
      songUrl: track.external_urls.spotify,
    }));

    // Fetch Recently Played Songs (last 50 tracks)
    const recentlyPlayedData = await fetchSpotifyData(
      SPOTIFY_RECENTLY_PLAYED_ENDPOINT,
      access_token
    );
    const recentTracksMap = new Map();

    // Deduplicate based on song ID and limit to 5 unique songs
    for (const play of recentlyPlayedData.items) {
      const track = play.track;
      if (!recentTracksMap.has(track.id)) {
        recentTracksMap.set(track.id, {
          title: track.name,
          artist: track.artists.map((artist: any) => artist.name).join(", "),
          album: track.album.name,
          albumImageUrl: track.album.images[0].url,
          songUrl: track.external_urls.spotify,
        });
      }
      if (recentTracksMap.size >= 5) break;
    }

    const recentTracks = Array.from(recentTracksMap.values());

    return new Response(
      JSON.stringify({
        currentlyPlaying: currentSong,
        topTracksThisMonth: topTracks,
        topTracksLast7Days: recentTracks,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching Spotify data" }),
      {
        status: 500,
      }
    );
  }
};
