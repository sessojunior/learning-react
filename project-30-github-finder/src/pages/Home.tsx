import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

interface User {
  login: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
}

export default function Home() {
  const [inputUser, setInputUser] = useState<string>("");
  const [user, setUser] = useState<User>({
    login: "",
    location: "",
    followers: 0,
    following: 0,
    public_repos: 0,
    avatar_url: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputUser);

    if (inputUser.trim().length <= 3) {
      alert('Nome de usuário inválido, o nome deve ter pelo menos 3 caracteres');
      setError(true);
      return;
    }

    setUser({ ...user, login: inputUser });
  }

  useEffect(() => {
    if (user.login === "") return;
    async function loadData() {
      try {
        const response = await axios.get(`https://api.github.com/users/${user.login}`);
        console.log(response.data);
        setUser({
          login: response.data.login,
          location: response.data.location,
          followers: response.data.followers,
          following: response.data.following,
          public_repos: response.data.public_repos,
          avatar_url: response.data.avatar_url,
        });
        setError(false);
      } catch (error) {
        setError(true);
        alert("Usuário não encontrado");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [user.login]);

  return (
    <div>
      <h1>GitHub Finder</h1>
      <p>Busque por um usuário do GitHub:</p>
      <p>Conheça seus melhores repositórios</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="user"
            placeholder="Digite o nome do usuário"
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
          />
          <button type='submit'><FaSearch /></button>
        </div>
      </form>
      {user.login && isLoading && <p>Carregando...</p>}
      {user.login && !isLoading && !error && (
        <div>
          <p>Imagem de perfil: <img src={user.avatar_url} alt="imagem" width={100} height={100} /></p>
          <p>Nome: {user.login}</p>
          <p>Localidade: {user.location}</p>
          <p>Seguidores: {user.followers}</p>
          <p>Seguindo: {user.following}</p>
          <p>Repositórios: {user.public_repos}</p>
          <p><Link to={`/user/${user.login}`}>Ver melhores projetos</Link></p>
        </div>
      )}
    </div>
  );
}
