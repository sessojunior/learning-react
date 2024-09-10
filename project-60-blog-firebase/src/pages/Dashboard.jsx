import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsList = [];
        querySnapshot.forEach((doc) => {
          postsList.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postsList);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts(posts.filter((post) => post.id !== id)); // Remove o post deletado da lista
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  if (loading) {
    return <p>Carregando posts...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full p-8">
      <h1 className="text-2xl font-bold p-4">Dashboard</h1>
      <p>Esta é a página do dashboard.</p>

      <section className="flex flex-col gap-4 w-[480px]">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="border border-gray-300 rounded p-4 m-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <div>
                <Link to={`/dashboard/post/${post.id}/edit`} className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all mr-2">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 cursor-pointer transition-all"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum post encontrado.</p>
        )}
      </section>
    </div>
  );
}
