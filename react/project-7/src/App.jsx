import './App.css'
import { useEffect, useState } from "react"

function App() {
  const [news, setNews] = useState([])

  useEffect(() => {
    function loadNews() {
      try {
        const url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'pageSize=25&' +
          'page=1&' +
          'apiKey=e2f0afe1d96e475494b4ece470263e75';
        fetch(url).then((response) => response.json())
          .then((data) => {
            console.log(data.articles)
            setNews(data.articles)
          })
      } catch (error) {
        console.log(error)
      }
    }
    loadNews()
  }, [])

  // console.log(news)

  return (
    <div className='app'>
      <div className="container">
        <header>
          <h1>News API</h1>
        </header>
        <main>
          <div className="cards">
            <h2>Últimas notícias</h2>
            {news.map((item, index) => (
              <div className="card" key={index}>
                <img src={item.urlToImage} alt={item.content} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><small><em>{item.author}</em> | {item.publishedAt}</small></p>
                <button>Ler mais</button>
              </div>
            ))}
          </div>
        </main>
        <footer>
          <p>Feito utilizando a News API</p>
        </footer>
      </div>
    </div>
  )
}

export default App
