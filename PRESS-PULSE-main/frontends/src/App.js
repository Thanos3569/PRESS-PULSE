import React from 'react';
import './App.css';
import News from './News';
import headImage from './head.png'; // Import the image

const App = () => {
  const newsSources = [
    { newspaper: "ETnews", title: "The Economic Times", url: "https://economictimes.indiatimes.com/rssfeedstopstories.cms" },
    { newspaper: "THnews", title: "The Hindu", url: "https://www.thehindu.com/feeder/default.rss" },
    { newspaper: "AJnews", title: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" },
    { newspaper: "Gnews", title: "The Guardian", url: "https://www.theguardian.com/world/rss" },
  ];

  return (
    <div className="main-container">
      <div className="top-container">
        <img src={headImage} alt="Press Pulse" className="heading-image" />
      </div>
      <div className="news-container">
        <div className="news1234">
          {newsSources.map((source, index) => (
            <News
              key={index}
              newspaper={source.newspaper}
              title={source.title}
              url={source.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;