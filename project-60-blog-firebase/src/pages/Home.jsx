import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config'

export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
};

export default function Home() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts); // Inicialmente, os posts filtrados são todos os posts
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Função para filtrar os posts ao pesquisar
  const handleSearch = (e) => {
    e.preventDefault(); // Impede o comportamento padrão do form de recarregar a página
    const searchLower = search.toLowerCase();
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchLower)
    );
    setFilteredPosts(filtered); // Atualiza os posts filtrados
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-8">
      <h1 className="text-2xl font-bold p-4 text-center">Veja os nossos posts mais recentes</h1>
      
      {/* Formulário de busca */}
      <form onSubmit={handleSearch}>
        <div className="flex gap-1 justify-center items-center m-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Busque posts por título..."
            className="border border-gray-300 rounded p-2 mr-2 w-60"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all"
          >
            Pesquisar
          </button>
        </div>
      </form>

      {loading ? (
        <p>Carregando posts...</p>
      ) : (
        <section className="flex flex-col gap-4 w-[480px]">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="border border-gray-300 rounded p-4 m-4">
                <div className="flex flex-col-reverse">
                  <h2 className="text-xl font-bold py-2">
                    <Link to={`/post/${post.id}`} className="hover:text-blue-500">
                      {post.title}
                    </Link>
                  </h2>
                  <img
                    src={post.urlImage}
                    alt={post.title}
                    className="w-full h-[200px] object-cover"
                  />
                </div>
                <p className="pb-4">{post.content}</p>
                <p className="text-sm">Por: {post.author}</p>
                <p className="text-sm">Tags: {post.tags.join(', ')}</p>
              </div>
            ))
          ) : (
            <p>Nenhum post encontrado.</p>
          )}
        </section>
      )}
    </div>
  )
}
