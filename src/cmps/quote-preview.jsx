import { useState } from "react";
import { quoteService } from "../services/quote.service";

export function QuotePreview({ quote }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function toggleFavorite() {
    // Toggle the favorite status and update the state accordingly
    quoteService.toggleFavorite(!isFavorite, quote);
    setIsFavorite(!isFavorite);
  }

  return (
    <div className="quote-preview">
      <div className="star" onClick={toggleFavorite}>
        {/* Display a star icon if the quote is a favorite */}
        {isFavorite && (
          <i
            className="fa-solid fa-star fa-2xl"
            style={{ color: "#FFD700" }}
          ></i>
        )}
        {/* Display an empty star icon if the quote is not a favorite */}
        {!isFavorite && (
          <i class="fa-regular fa-star fa-2xl" style={{ color: "#201f1e" }}></i>
        )}
      </div>
      <p>
        "{quote.quote}" <span>({quote.author})</span>
      </p>
    </div>
  );
}
