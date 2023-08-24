import axios from 'axios';

const API_KEY = 'X/3y7Qye5LXBEgDyBm+5qQ==q3gyC584eRvRVSSk';
const APIֹֹֹ_URL = 'https://api.api-ninjas.com/v1/quotes?category=';

export const quoteService = {
    getRandomQuote,
    toggleFavorite,
    getFavoriteQuote,
    removeFavorite,
    getCategorise,
}

async function getRandomQuote(){
    try {
      const response = await axios.get(APIֹֹֹ_URL, {
        headers: {
          'X-Api-Key': API_KEY,
        },
      });
      return response.data[0]
    } catch (error) {
      console.error('error in API request:', error.message);
      throw error;
    }      
}

function getFavoriteQuote(selectedCategory){
    const quotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
    if (!selectedCategory) return quotes
    const filteredQuotes = quotes.filter((quote) => quote.category === selectedCategory);
    return filteredQuotes
}

function getCategorise(){
    const quotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
    const categorise = _collectCategorise(quotes)
    return categorise
}

function toggleFavorite(isFavorite, quote){
    if (isFavorite) {
        const favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
        quote._id = _generateRandomId()
        favoriteQuotes.push(quote);
        localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
    } else {
        const favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
        const updatedQuotes = favoriteQuotes.filter((favQuote) => favQuote.quote !== quote.quote);
        localStorage.setItem('favoriteQuotes', JSON.stringify(updatedQuotes));
    }
}

function removeFavorite(id){
    const favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes'))
    const updatedQuotes = favoriteQuotes.filter((quote) => quote._id !== id);
    localStorage.setItem('favoriteQuotes', JSON.stringify(updatedQuotes));
}

function _collectCategorise(arr){
    const categories = arr.reduce((acc, quote) => {
        if (!acc.includes(quote.category)) {
          acc.push(quote.category);
        }
        return acc;
      }, []);
    return categories
}

function _generateRandomId() {
    return Math.random().toString(36).substring(2, 10);
}






