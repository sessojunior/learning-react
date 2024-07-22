import './output.css'

import Toolbar from './components/Toolbar'
import Gallery from './components/Gallery'
import Photo from './components/Photo'

import axios from 'axios'

import { useState, useEffect } from 'react'

export default function App() {

  const apiKey = import.meta.env.VITE_API_KEY_UNSPLASH
  const [photos, setPhotos] = useState([])
  const [category, setCategory] = useState("all")
  const [photo, setPhoto] = useState(null)

  async function getPhotos() {
    try {
      const response = await axios.get("https://api.unsplash.com/search/photos?page=1&query=" + category, {
        headers: {
          Authorization: "Client-ID " + apiKey
        }
      })
      console.log(response.data.results)

      setPhotos(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPhotos()
  }, [])

  useEffect(() => {
    getPhotos()
  }, [apiKey, category])

  function changeCategory(category) {
    console.log("changeCategory", category)

    if (category.length < 3) {
      alert("Digite pelo menos 3 caracteres")
      return
    }
    
    setCategory(category)
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-2">Album de fotos</h1>
      <Toolbar category={category} changeCategory={changeCategory} />
      <Gallery photos={photos} setPhoto={setPhoto} />
      <Photo photo={photo} setPhoto={setPhoto} />
    </>
  )
}
