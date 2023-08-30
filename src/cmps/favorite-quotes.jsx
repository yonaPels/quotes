import React, { useEffect, useState } from "react";
import { quoteService } from "../services/quote.service";

/**
 * FavoriteQuotes Component
 * This component displays a list of favorite quotes with filtering by category.
 */
export function FavoriteQuotes() {
  // Define state variables for quotes, categories, and the selected category
  const [quotes, setQuotes] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  /**
   * useEffect to Load Categories and Quotes
   * This effect runs whenever the selectedCategory state changes.
   * It loads the categories and quotes based on the selected category.
   */
  useEffect(() => {
    loadCategories();
    loadQuotes(selectedCategory);
  }, [selectedCategory]);

  /**
   * Load Quotes
   * This function loads favorite quotes based on the selected category.
   * param {string} selectedCategory - The selected category for filtering quotes.
   */
  async function loadQuotes(selectedCategory) {
    try {
      const quotes = await quoteService.getFavoriteQuote(selectedCategory);
      setQuotes(quotes);
    } catch (err) {
      console.error("Error fetching quotes:", err);
    }
  }

  /**
   * Load Categories
   * This function loads the available categories for filtering.
   */
  function loadCategories() {
    const categories = quoteService.getCategories();
    setCategories(categories);
  }

  /**
   * Remove Favorite
   * This function removes a quote from the favorites list.
   * param {string} quoteId - The ID of the quote to remove from favorites.
   */
  function removeFavorite(quoteId) {
    quoteService.removeFavorite(quoteId);
    const updatedCategories = quoteService.getCategories();
    setCategories(updatedCategories);

    // If the selected category is no longer available, clear it
    if (!updatedCategories.includes(selectedCategory)) {
      setSelectedCategory(null);
    }

    // Reload the quotes based on the selected category
    loadQuotes(selectedCategory);
  }

  // Display loading message if quotes are being fetched
  if (quotes === "") return <h1 className="loading">Loading...</h1>;

  // Display a message if there are no favorite quotes
  if (Array.isArray(quotes) && quotes.length === 0) {
    return <h1>You have not selected any favorite quotes yet!</h1>;
  }

  // Render the component with the list of favorite quotes and category filtering
  return (
    <>
      <h1>Your Favorite Quotes:</h1>
      <div className="categories-filter">
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ul className="favorite-quotes">
        {quotes.map((quote) => (
          <li key={quote._id}>
            <div onClick={() => removeFavorite(quote._id)}>
              <i
                className="fa-solid fa-star fa-2xl"
                style={{ color: "#FFD700" }}
              />
            </div>
            <p>
              "{quote.quote}" <span>({quote.author})</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
