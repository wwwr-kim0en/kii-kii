// https://developers.google.com/youtube/youtube_player_demo
export default function YoutubePlayer({ videoId = 'AEfi_SKTEU' }: { videoId: string }) {
	return (
		<iframe
			width="720"
			height="405"
			src={`https://www.youtube.com/embed/${videoId}`}
			title=""
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	);
}
