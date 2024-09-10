import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../contexts/AuthContext'

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config'

export default function PostAdd() {

  const [title, setTitle] = useState('')
  const [urlImage, setUrlImage] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('')
  const [tags, setTags] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (!title || !urlImage || !body || !author) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    const newTags = tags.split(',').map((tag) => tag.trim().toLowerCase())

    const post = {
      title,
      urlImage,
      body,
      author,
      tags: newTags
    }

    let res

    setLoading(true)
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        ...post,
        createdAt: new Date(),
      });
      res = await { success: true, id: docRef.id };
    } catch (error) {
      return { error: error.message };
    } finally {
      setLoading(false);
    }

    console.log("res", res)

    if (res.error) {
      setError(res.error)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full p-8">
      <h1 className="text-2xl font-bold p-4">Cadastrar post</h1>
      <p>Utilize esta página para cadastrar um post.</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center w-[480px] p-2 m-8 border border-gray-300">
          <div className="flex flex-col gap-2 p-4 w-full justify-center items-center mx-4">
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="title" className="text-sm font-bold pb-2">Titulo</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} autoComplete="off" placeholder="Coloque o título do post" className="border border-gray-300 rounded p-2 mr-2 w-full" required />
            </div>
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="urlImage" className="text-sm font-bold pb-2">URL da imagem</label>
              <input type="text" id="urlImage" value={urlImage} onChange={(e) => setUrlImage(e.target.value)} autoComplete="off" placeholder="Digite a URL da imagem do post" className="border border-gray-300 rounded p-2 mr-2 w-full" required />
            </div>
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="body" className="text-sm font-bold pb-2">Conteúdo</label>
              <textarea name="body" id="body" value={body} onChange={(e) => setBody(e.target.value)} autoComplete="off" placeholder="Conteúdo do post" className="border border-gray-300 rounded p-2 mr-2 w-full" required></textarea>
            </div>
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="tags" className="text-sm font-bold pb-2">Tags</label>
              <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} autoComplete="off" placeholder="Digite as tags separadas por vírgula" className="border border-gray-300 rounded p-2 mr-2 w-full" required />
            </div>
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="author" className="text-sm font-bold pb-2">Autor</label>
              <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} autoComplete="off" placeholder="Coloque o nome do autor" className="border border-gray-300 rounded p-2 mr-2 w-full" required />
            </div>
            {!loading ? (
              <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all min-w-32">Cadastrar</button>
            ) : (
              <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all min-w-32" disabled>Aguarde...</button>
            )}
            {error && <p className="p-2 m-2 text-red-500 border border-red-200 bg-red-50 rounded-md">{error}</p>}
          </div>
        </div>
      </form>
    </div>
  )
}
