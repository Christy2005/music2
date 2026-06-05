import React from 'react';


const moods = ['Happy', 'Sad', 'Angry', 'Tired', 'Excited'];
export default function MoodSelector({ onMoodSelect }) {
  return (
    <div>
      <h2>How are you feeling?</h2>
      {moods.map((mood) => (
        <button className="mood-btn"
  key={mood}
  onClick={() => onMoodSelect(mood)}
  style={{
    padding: "12px 20px",
    margin: "10px",
    borderRadius: "25px",
    border: "none",
    background: "white",
    color: "#333",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
  onMouseOver={(e) => {
    e.target.style.transform = "scale(1.1)";
  }}
  onMouseOut={(e) => {
    e.target.style.transform = "scale(1)";
  }}
>
  {mood}
</button>

      ))}
    </div>
  );
}
