import axios from 'axios';

const spotifyClientId = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`;

const spotifyInstance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}`,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPOTIFY_API_KEY}`,
	},
	data: {
		client_id: spotifyClientId,
		client_secret: process.env.NEXT_PUBLIC_SPOTIFY,
	},
	params: {
		grant_type: 'client_credentials',
	},
});
