import axios from 'axios';

const API_KEY = 'X/3y7Qye5LXBEgDyBm+5qQ==q3gyC584eRvRVSSk';
const API_URL = 'https://api.api-ninjas.com/v1/quotes?category=';

export const quoteService = {
    getRandomQuote,
    toggleFavorite,
    getFavoriteQuote,
    removeFavorite,
    getCategories,
    getQuotesByCategory,
}

/**
 * Get a random quote from the API.
 * param {number} maxLength - Maximum length of the quote text.
 * returns {Object} - A random quote object.
 * throws {Error} - If there is an error in the API request.
 */
async function getRandomQuote(maxLength = 300) {
    try {
        const { data } = await axios.get(API_URL, {
            headers: {
                'X-Api-Key': API_KEY,
            },
        });
        if (data[0].quote.length < maxLength) return data[0];
        else return getRandomQuote()
    } catch (error) {
        console.error('Error in API request:', error.message);
        throw error;
    }
}

async function getQuotesByCategory(category) {
  try {
    const { data } = await axios.get(`${API_URL}${category}&limit=6`, {
        headers: {
            'X-Api-Key': API_KEY,
        },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching quotes by category:", error);
    throw error;
  }
}

/**
 * Get favorite quotes optionally filtered by category.
 * param {string} selectedCategory - The selected category for filtering quotes (optional).
 * returns {Array} - An array of favorite quotes.
 */
function getFavoriteQuote(selectedCategory) {
    const quotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
    if (!selectedCategory) return quotes
    const filteredQuotes = quotes.filter((quote) => quote.category === selectedCategory);
    return filteredQuotes
}

/**
 * Get unique categories from the list of favorite quotes.
 * returns {Array} - An array of unique categories.
 */
function getCategories() {
    const quotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
    const categories = _collectCategories(quotes)
    return categories
}

/**
 * Toggle a quote as a favorite or remove it from favorites.
 * param {boolean} isFavorite - Indicates if the quote should be added or removed from favorites.
 * param {Object} quote - The quote object to add or remove from favorites.
 */
function toggleFavorite(isFavorite, quote) {
    if (isFavorite) {
        quote._id = _generateRandomId()
        const favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
        favoriteQuotes.push(quote);
        localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
    } else {
        const favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
        const updatedQuotes = favoriteQuotes.filter((favQuote) => favQuote.quote !== quote.quote);
        localStorage.setItem('favoriteQuotes', JSON.stringify(updatedQuotes));
    }
}

/**
 * Remove a quote from favorites by its ID.
 * param {string} id - The ID of the quote to remove from favorites.
 */
function removeFavorite(id) {
    const favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes'))
    const updatedQuotes = favoriteQuotes.filter((quote) => quote._id !== id);
    localStorage.setItem('favoriteQuotes', JSON.stringify(updatedQuotes));
}

/**
 * Collect unique categories from an array of quotes.
 * param {Array} arr - An array of quotes.
 * returns {Array} - An array of unique categories.
 */
function _collectCategories(arr) {
    const categories = arr.reduce((acc, quote) => {
        if (!acc.includes(quote.category)) {
            acc.push(quote.category);
        }
        return acc;
    }, []);
    return categories
}

/**
 * Generate a random ID.
 * returns {string} - A random ID string.
 */
function _generateRandomId() {
    return Math.random().toString(36).substring(2, 10);
}
