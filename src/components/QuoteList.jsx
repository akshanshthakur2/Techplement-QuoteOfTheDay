import React, { useState, useEffect } from 'react';

const QuoteList = ({ quotes }) => {
  const [search, setSearch] = useState('');

  const filteredQuotes = quotes.filter(quote =>
    quote.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredQuotes.map((quote, index) => (
          <li key={index}>
            <blockquote>
              <p>"{quote.text}"</p>
              <footer>- {quote.author}</footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;
