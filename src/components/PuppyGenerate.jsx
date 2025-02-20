import React, { useState, useEffect } from 'react';
import '../App.css';

const PuppyGenerate = () => {
  const [puppy, setPuppy] = useState('');
  const [themeColor, setThemeColor] = useState('#f0f0f0');
  const [clickCount, setClickCount] = useState(0); // State for puppy button clicks
  const [themeClickCount, setThemeClickCount] = useState(0); // State for theme button clicks
  const maxClicks = 7; // Maximum clicks for puppy button
  const maxThemeClicks = 10; // Maximum clicks for theme button

// getting a random dog image from the API and if not the error will run 
  const fetchData = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setPuppy(data.message);
    } catch (error) {
      console.error("Error fetching the dog image: ", error);
    }
  };
// Fetching the initial dog image
  useEffect(() => {
    fetchData();
  }, []);
// this generates the dog image if the maxClicks is not reached
  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    if (clickCount < maxClicks) {
      fetchData();
    }
  };

  const handleBack = () => {
    setClickCount(0);
  };
// Generates the random colors for the background
  const handleThemeClick = () => {
    setThemeClickCount((prevCount) => prevCount + 1); // Increment theme click count
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setThemeColor(randomColor);
    document.body.style.backgroundColor = randomColor;
  };

  const handleThemeBack = () => {
    setThemeClickCount(0); // Reset theme click count
  };

  return (
    <div className="puppy-container">
      {puppy ? <img src={puppy} alt="Random Puppy" className="puppy-image" /> : <p>Loading...</p>}

      {/* Show the angry message and "Back" button if puppy clickCount exceeds maxClicks */}
      {clickCount >= maxClicks ? (
        <div>
          <p className="angry-message">😡 WHY ARE YOU STILL CLICKING THE BUTTON? DO YOU HAVE ADHD OR SOMETHING?</p>
          <button onClick={handleBack}>Back</button>
        </div>
      ) : (
        // Show the "Show Another Puppy" button if clickCount is within the limit
        <button onClick={handleClick}>Show Another Puppy</button>
      )}

      {/* Show the epilepsy warning message and "Back" button if themeClickCount exceeds maxThemeClicks */}
      {themeClickCount >= maxThemeClicks ? (
        <div>
          <p className="epilepsy-message">😂 IF YOU'RE NOT EPILEPTIC, YOU SURE ARE NOW!</p>
          <button onClick={handleThemeBack}>Back</button>
        </div>
      ) : (
        // Show the "Change Theme Color" button if themeClickCount is within the limit
        <button onClick={handleThemeClick}>Change Theme Color</button>
      )}
    </div>
  );
};

export default PuppyGenerate;