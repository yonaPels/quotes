import React, { useState, useEffect } from 'react';
import { quoteService } from '../services/quote.service';

export function GenerateQuote() {
  const [quote, setQuote] = useState('');
  const [isFavorite, setIsFavorite] = useState(false)


  // קריאה ראשונית לפונקציה לקבלת ציטוט רנדומלי בעת טעינת העמוד
  useEffect(() => {
    fetchRandomQuote();
  }, []);
  
  // הפונקציה לקבלת ציטוט רנדומלי מה-API
  async function fetchRandomQuote(){
    try{
      const quote = await quoteService.getRandomQuote()
      setQuote(quote)
      setIsFavorite(false)
    } catch(err) {
      console.error('Error fetching quote:', err)
    }
  };

  // פונקציה לסימון ציטוט כמועדף
  function toggleFavorite(){
    quoteService.toggleFavorite(!isFavorite, quote)
    setIsFavorite(!isFavorite)
  };

  if (quote==='') return <h1>Loding...</h1> 

  return (
    <section>
      <h1>Here is an inspirational quote:</h1>
      <div className='show-quote'>
        <div onClick={toggleFavorite}>
          {isFavorite &&<i className="fa-solid fa-star fa-2xl" style={{ color: '#FFD700' }}></i>}
          {!isFavorite &&<i class="fa-regular fa-star fa-2xl" style={{color: '#201f1e' }}></i>}
        </div>
        <p>"{quote.quote}"  <span>({quote.author})</span></p>
      </div>
      <h3 className='btn-show-another-quote' onClick={fetchRandomQuote}>Show me another quote, please!</h3>
    </section>
  );
}
