import React, { useState } from "react";
import { quoteService } from "../services/quote.service";
import { QuotePreview } from "./quote-preview";

const categories = [
  "humor",
  "health",
  "good",
  "family",
  "dreams",
  "design",
  "best",
  "art",
];

export function QuotesByCategory() {
  const [quotes, setQuotes] = useState([]);
  const [isLouding, setIsLouding] = useState(false);

  async function loadQuotes(category) {
    setIsLouding(true);
    try {
      const quotes = await quoteService.getQuotesByCategory(category);
      setQuotes(quotes);
      setIsLouding(false);
    } catch (err) {
      console.error("Error fetching quotes:", err);
    }
  }

  return (
    <div>
      <h1>Choose your category:</h1>
      <div className="katgory-btn-container">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => loadQuotes(category)}
            className="katgory-btn"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="favorite-quotes">
        {isLouding && <h1 className="loading">Loading...</h1>}
        {!isLouding && (
          <>
            {quotes.length > 0 && (
              <h2>Here are six selected quotes on your chosen topic:</h2>
            )}
            <ul>
              {quotes.map((quote, index) => (
                <li key={index}>
                  <QuotePreview quote={quote} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
