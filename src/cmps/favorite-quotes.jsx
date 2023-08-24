import { useEffect, useState } from "react"
import { quoteService } from "../services/quote.service"

export function FavoriteQuotes(){

    const [quotes, setQuotes] = useState('')
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        loudingCategorise()
        loudingQuotes(selectedCategory)
    }, [selectedCategory])

    async function loudingQuotes(selectedCategory){
        try{
          const quotes = await quoteService.getFavoriteQuote(selectedCategory)
          setQuotes(quotes)
        } catch(err) {
          console.error('Error fetching quote:', err)
        }
    };

    function loudingCategorise(){
        setCategories(quoteService.getCategorise())
    }

    function removeFavorite(quoteId){
        quoteService.removeFavorite(quoteId)
        const categories = quoteService.getCategorise()
        setCategories(categories)
        if (!categories.includes(selectedCategory)) setSelectedCategory(null)
        const quotes = quoteService.getFavoriteQuote(selectedCategory)
        setQuotes(quotes)
    }

    if (quotes === '') return <h1>Loding...</h1>
    if ((Array.isArray(quotes) && quotes.length === 0)) return (<h1>You have not selected favorite quotes yet!</h1>)

    return(
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
            {quotes.map(quote =>
                <li key={quote._id}>
                    <div onClick={()=>removeFavorite(quote._id)}>
                        <i className="fa-solid fa-star fa-2xl" style={{ color: '#FFD700' }}/>
                    </div>
                    <p>"{quote.quote}"  <span>({quote.author})</span></p>
                </li>)}
        </ul>
        </>)
}