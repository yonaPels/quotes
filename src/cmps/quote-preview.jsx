import { useState } from "react";
import { quoteService } from "../services/quote.service";

/**
 * QuotePreview Component
 * This component displays a single quote and allows the user to mark it as a favorite.
 *
 * @param {Object} quote - The quote object to display.
 */
export function QuotePreview({ quote }) {
  // Define state variable for the favorite status
  const [isFavorite, setIsFavorite] = useState(false);

  /**
   * Toggle Favorite Status
   * This function toggles the favorite status of the quote and updates the state accordingly.
   */
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
          <i
            className="fa-regular fa-star fa-2xl"
            style={{ color: "#201f1e" }}
          ></i>
        )}
      </div>
      <p>
        "{quote.quote}" <span>({quote.author})</span>
      </p>
    </div>
  );
}
