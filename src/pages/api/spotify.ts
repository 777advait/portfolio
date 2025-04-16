import type { APIRoute } from "astro";
import "dotenv/config";

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_TOP_TRACKS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5";

const getAccessToken = async () => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!refresh_token || !client_id || !client_secret) {
    throw new Error("Missing Spotify environment variables.");
  }

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Spotify Token Error:", errorText);
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
    const errorText = await response.text();
    console.error(`Error fetching from ${endpoint}:`, errorText);
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  return response.json();
};

export const GET: APIRoute = async () => {
  try {
    const { access_token } = await getAccessToken();

    // Currently Playing
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
        }
      : null;

    // Top Tracks
    const topTracksData = await fetchSpotifyData(
      SPOTIFY_TOP_TRACKS_ENDPOINT,
      access_token
    );
    const topTracks = topTracksData.items.map((track: any) => ({
      title: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(", "),
      songUrl: track.external_urls.spotify,
    }));

    return new Response(
      JSON.stringify({
        currentlyPlaying: currentSong,
        topTracksThisMonth: topTracks,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching Spotify data" }),
      { status: 500 }
    );
  }
};
