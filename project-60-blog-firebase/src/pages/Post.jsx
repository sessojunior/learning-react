import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Post() {
  const { id } = useParams(); // Pega o ID do post pela URL
  const [post, setPost] = useState(null); // Armazena os dados do post
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id); // Referência ao documento específico
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() }); // Define o post com os dados
        } else {
          console.error("Nenhum post encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar o post:", error);
      } finally {
        setLoading(false); // Desativa o estado de carregamento
      }
    };

    fetchPost();
  }, [id]); // Executa a busca toda vez que o ID mudar

  if (loading) {
    return <p>Carregando post...</p>;
  }

  if (!post) {
    return <p>Nenhum post encontrado!</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full p-8">
      <h2 className="text-xl font-bold py-2">{post.title}</h2>
      <section className="flex flex-col w-[480px]">
        <div className="border border-gray-300 rounded p-4 m-4">
          <div className="flex flex-col-reverse">
            <img
              src={post.urlImage}
              alt={`Imagem do post ${post.title}`}
              className="w-full h-[200px] object-cover"
            />
          </div>
          <p className="pb-4">{post.content}</p>
          <p className="text-sm">Por: {post.author}</p>
          <p className="text-sm">Tags: {post.tags.join(", ")}</p>
        </div>
      </section>
    </div>
  );
}
