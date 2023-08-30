import React, { useState, useEffect } from "react";
import { quoteService } from "../services/quote.service";
import { QuotePreview } from "./quote-preview";

/**
 * GenerateQuote Component
 * This component displays a random inspirational quote and allows the user to mark it as a favorite.
 */
export function GenerateQuote() {
  // Define state variables for the current quote and its favorite status
  const [quote, setQuote] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  /**
   * useEffect to Fetch a Random Quote
   * This effect runs once when the component is mounted and fetches a random quote from the API.
   */
  useEffect(() => {
    fetchRandomQuote();
  }, []);

  /**
   * Fetch a Random Quote
   * This function fetches a random quote from the API and updates the state with the new quote.
   */
  async function fetchRandomQuote() {
    // Store the previous quote to handle errors
    const prevQuote = quote;
    // Clear the current quote while fetching
    setQuote("");
    try {
      // Fetch a random quote from the service
      const newQuote = await quoteService.getRandomQuote();
      // Update the state with the new quote and mark it as not a favorite
      setQuote(newQuote);
      setIsFavorite(false);
    } catch (err) {
      // Handle errors by logging them and restoring the previous quote
      console.error("Error fetching quote:", err);
      setQuote(prevQuote);
    }
  }

  // If there's no quote, display a loading message
  if (quote === "") return <h1 className="loading">Loading...</h1>;

  // Render the component with the current quote and favorite status
  return (
    <section>
      <h1>Here is an inspirational quote:</h1>
      <div className="show-quote">
        <QuotePreview quote={quote} />
      </div>
      <h3 className="btn-show-another-quote" onClick={fetchRandomQuote}>
        Show me another quote, please!
      </h3>
    </section>
  );
}
