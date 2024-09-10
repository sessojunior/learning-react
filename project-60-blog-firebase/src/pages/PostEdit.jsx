import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const post = docSnap.data();
          setTitle(post.title);
          setUrlImage(post.urlImage);
          setBody(post.body);
          setAuthor(post.author);
          setTags(post.tags.join(', ')); // Assume tags are stored as an array
        } else {
          console.log("Nenhum post encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar o post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!title || !urlImage || !body || !author) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const newTags = tags.split(',').map((tag) => tag.trim().toLowerCase());

    const post = {
      title,
      urlImage,
      body,
      author,
      tags: newTags,
    };

    setLoading(true);
    try {
      const docRef = doc(db, 'posts', id);
      await updateDoc(docRef, post);
      navigate('/dashboard'); // Redireciona para o dashboard após a atualização
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full p-8">
      <h1 className="text-2xl font-bold p-4">Editar post</h1>
      <p>Utilize esta página para editar um post.</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center w-[480px] p-2 m-8 border border-gray-300">
          <div className="flex flex-col gap-2 p-4 w-full justify-center items-center mx-4">
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="title" className="text-sm font-bold pb-2">Título</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete="off"
                placeholder="Coloque o título do post"
                className="border border-gray-300 rounded p-2 mr-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="urlImage" className="text-sm font-bold pb-2">URL da imagem</label>
              <input
                type="text"
                id="urlImage"
                value={urlImage}
                onChange={(e) => setUrlImage(e.target.value)}
                autoComplete="off"
                placeholder="Digite a URL da imagem do post"
                className="border border-gray-300 rounded p-2 mr-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="body" className="text-sm font-bold pb-2">Conteúdo</label>
              <textarea
                name="body"
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                autoComplete="off"
                placeholder="Conteúdo do post"
                className="border border-gray-300 rounded p-2 mr-2 w-full"
                required
              ></textarea>
            </div>
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="tags" className="text-sm font-bold pb-2">Tags</label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                autoComplete="off"
                placeholder="Digite as tags separadas por vírgula"
                className="border border-gray-300 rounded p-2 mr-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="author" className="text-sm font-bold pb-2">Autor</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                autoComplete="off"
                placeholder="Coloque o nome do autor"
                className="border border-gray-300 rounded p-2 mr-2 w-full"
                required
              />
            </div>
            {!loading ? (
              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all min-w-32"
              >
                Atualizar
              </button>
            ) : (
              <button
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all min-w-32"
                disabled
              >
                Aguarde...
              </button>
            )}
            {error && (
              <p className="p-2 m-2 text-red-500 border border-red-200 bg-red-50 rounded-md">
                {error}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
