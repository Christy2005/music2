import React, { useRef, useState } from "react";
import * as faceapi from "face-api.js";

const EmotionDetector = ({ onMoodDetected }) => {
  const videoRef = useRef();
  const [isDetecting, setIsDetecting] = useState(false);

  const startDetection = async () => {
    setIsDetecting(true);

    // Load models
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");

    // Start camera
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;

    // Wait 2 seconds before detecting (camera warm-up)
    setTimeout(async () => {
      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (detection) {
        const expressions = detection.expressions;

        let detectedEmotion = null;
        let maxConfidence = 0;

        for (let emotion in expressions) {
          if (expressions[emotion] > maxConfidence) {
            maxConfidence = expressions[emotion];
            detectedEmotion = emotion;
          }
        }

        const emotionMap = {
          happy: "Happy",
          sad: "Sad",
          angry: "Angry",
          surprised: "Excited",
          neutral: "Tired",
        };

        if (emotionMap[detectedEmotion]) {
          onMoodDetected(emotionMap[detectedEmotion]);
        }
      }

      // 🔥 STOP CAMERA AFTER DETECTION
      stream.getTracks().forEach((track) => track.stop());
      setIsDetecting(false);

    }, 2000);
  };

  return (
    <div>
      {!isDetecting && (
        <button onClick={startDetection} style={{backgroundColor:"lightskyblue",color:"black",fontSize:"18px"}}>
          Detect Mood Using Camera 🎥
        </button>
      )}

      {isDetecting && (
        <video ref={videoRef} autoPlay muted width="300" />
      )}
    </div>
  );
};

export default EmotionDetector;
