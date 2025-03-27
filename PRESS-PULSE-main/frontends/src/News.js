import React, { useState, useEffect } from 'react';

const News = ({ newspaper, title, url }) => {
  const [headlines, setHeadlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const proxyUrl = process.env.REACT_APP_PROXY_URL;

  useEffect(() => {
    const fetchHeadlines = async () => {
      const finalUrl = proxyUrl + encodeURIComponent(url);
      console.log("Fetching from URL: ", finalUrl);

      try {
        const response = await fetch(finalUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const items = xml.querySelectorAll('item title');

        let headlinesArray = [];
        items.forEach(item => {
          headlinesArray.push(item.textContent);
        });
        setHeadlines(headlinesArray.slice(0, 20)); // Limit to 20 headlines
        setError(null);
      } catch (error) {
        console.error('Error fetching headlines:', error);
        setError('Unable to load headlines');
        setHeadlines([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeadlines();
  }, [url, proxyUrl]);

  return (
    <div className={`news ${newspaper}`}>
      <div className="upper">
        <h2>{title}</h2>
      </div>
      <div className="lower">
        {isLoading ? (
          <div className="loading">Loading headlines...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <ul>
            {headlines.map((headline, index) => (
              <li key={index}>
                <div className="headline">
                  <span className="star">&#9733;</span>
                  {headline}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default News;