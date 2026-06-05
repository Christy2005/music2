import React, { useState } from "react";
import axios from "axios";
import MoodSelector from "./MoodSelector";
import EmotionDetector from "./EmotionDetector";
import MusicPlayer from "./MusicPlayer";
import { motion } from "framer-motion";
import "./style.css";

const genreMap = {
  Happy: [
    "happy upbeat music",
    "party songs",
    "happy film songs",
    "cheerful music",
    "cheerful film songs"
  ],

  Sad: [
    "sad emotional songs",
    "motivational music",
    "crying music",
    "AR rahman sad songs"
  ],

  Angry: [
    "angry rock music",
    "intense workout music",
    "mollywood energetic songs",
    "soothing songs"
  ],

  Tired: [
    "relaxing music",
    "chill beats",
    "calm music",
    "satisfying music"
  ],

  Excited: [
    "dance music",
    "party happy music",
    "bollywood disco music",
    "mollywood disco music"
  ],
};

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {

  const [videoUrl, setVideoUrl] = useState(null);
  const [currentMood, setCurrentMood] = useState(null);

  const fetchYoutubeVideo = async (mood) => {

    if (!genreMap[mood]) return;

    setCurrentMood(mood);

    const searchList = genreMap[mood];

    const randomSearch =
      searchList[Math.floor(Math.random() * searchList.length)];

    try {

      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            maxResults: 1,
            q: randomSearch,
            key: API_KEY,
            type: "video",
          },
        }
      );

      const videoId = response.data.items[0].id.videoId;

      setVideoUrl(`https://www.youtube.com/embed/${videoId}`);

    } catch (error) {

      console.error("youtube API error:", error);

    }
  };

  return (

    <motion.div
      className="video-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        textAlign: "center",
        padding: "300px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "white",
        fontFamily: "sans-serif"
      }}
    >

      <h1 className="title">Your own mood-Based Music player</h1>

      <EmotionDetector onMoodDetected={fetchYoutubeVideo} />

      {currentMood && <h2>Detected Mood:{currentMood}</h2>}

      <MoodSelector onMoodSelect={fetchYoutubeVideo} />

      {videoUrl && <MusicPlayer videoUrl={videoUrl} />}

    </motion.div>

  );
}

export default App;