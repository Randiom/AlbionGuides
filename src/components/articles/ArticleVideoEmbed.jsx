import React, { useEffect, useState } from 'react';
import Article from "/src/components/wrappers/Article.jsx";

function ArticleVideoEmbed({ data }) {
    const { title, apiKey, channelId } = data.locales.en;
    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
        async function fetchLatestVideo() {
            if (apiKey && channelId) {
                try {
                    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`);
                    const data = await response.json();
                    console.log("YouTube API Response:", data); // Check the full response structure

                    if (data.items && data.items.length > 0) {
                        const fetchedVideoId = data.items[0].id.videoId;
                        console.log("Extracted Video ID:", fetchedVideoId); // Confirm extracted video ID
                        setVideoId(fetchedVideoId);
                    }
                } catch (error) {
                    console.error("Error fetching the latest video:", error);
                }
            }
        }

        fetchLatestVideo();
    }, [channelId, apiKey]);

    return (
        <Article className="article-video-embed" title={title}>
            {videoId ? (
                <div className="video-embed-wrapper">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={title}
                        width="100%"
                        height="400"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : (
                <p>Loading latest video...</p>
            )}
        </Article>
    );
}

export default ArticleVideoEmbed;
