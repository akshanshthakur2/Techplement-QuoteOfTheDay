import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quoteOfTheDay, setQuoteOfTheDay] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/quote-of-the-day')
      .then((response) => response.json())
      .then((data) => setQuoteOfTheDay(data))
      .catch((error) => console.error('Error fetching quote of the day:', error));
  }, []);

  useEffect(() => {
    if (author) {
      fetch('http://localhost:5000/quotes')
        .then((response) => response.json())
        .then((data) => {
          const filtered = data.filter((quote) =>
            quote.author.toLowerCase().includes(author.toLowerCase())
          );
          setFilteredQuotes(filtered);
        })
        .catch((error) => console.error('Error fetching quotes:', error));
    }
  }, [author]);

  return (
    <div className="App">
      <h1>Quote of the Day</h1>
      {quoteOfTheDay ? (
        <blockquote>
          "{quoteOfTheDay.text}" — <strong>{quoteOfTheDay.author}</strong>
        </blockquote>
      ) : (
        <p>Loading quote of the day...</p>
      )}

      <h2>Search Quotes by Author</h2>
      <input
        type="text"
        placeholder="Enter author name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      {author && (
        <div>
          <h3>Quotes by {author}</h3>
          {filteredQuotes.length > 0 ? (
            filteredQuotes.map((quote, index) => (
              <blockquote key={index}>
                "{quote.text}" — <strong>{quote.author}</strong>
              </blockquote>
            ))
          ) : (
            <p>No quotes found for this author.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
