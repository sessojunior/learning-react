import { useState } from 'react'
import Feed from './components/Feed'

function App() {

  const [feed, setFeed] = useState([
    { id: 1, title: "Noticia 1", description: "Descrição da noticia 1", author: "Rafael", likes: 0 },
    { id: 2, title: "Noticia 2", description: "Descrição da noticia 2", author: "Gustavo", likes: 3 },
    { id: 3, title: "Noticia 3", description: "Descrição da noticia 3", author: "Fernanda", likes: 4 },
    { id: 4, title: "Noticia 4", description: "Descrição da noticia 4", author: "Rafael", likes: 3 },
    { id: 5, title: "Noticia 5", description: "Descrição da noticia 5", author: "Julio", likes: 0 },
    { id: 6, title: "Noticia 6", description: "Descrição da noticia 6", author: "Rafael", likes: 1 },
  ])

  return (
    <>
      <h1>Feed de notícias</h1>
      {feed.map(noticia => <Feed key={noticia.id} {...noticia} />)}
    </>
  )
}

export default App
