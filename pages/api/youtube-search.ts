import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.error('YouTube API key is not set');
    return res.status(500).json({ error: 'YouTube API key is not configured' });
  }

  const youtube = google.youtube({
    version: 'v3',
    auth: apiKey
  });

  try {
    const response = await youtube.search.list({
      part: ['snippet'],
      q: query,
      type: ['video'],
      maxResults: 3
    });

    const videos = response.data.items?.map(item => ({
      title: item.snippet?.title || '',
      url: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
      thumbnailUrl: item.snippet?.thumbnails?.default?.url || ''
    })) || [];

    res.status(200).json(videos);
  } catch (error: any) {
    console.error('Error fetching YouTube videos:', error);
    res.status(500).json({ error: 'Failed to fetch YouTube videos', details: error.message });
  }
}
