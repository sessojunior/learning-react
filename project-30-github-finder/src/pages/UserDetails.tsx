import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";

import { FaRegStar } from "react-icons/fa6";
import { FaCodeFork } from "react-icons/fa6";

interface User {
  name: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
  repos: Repo[];
}

interface Repo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export default function UserDetails() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User>({
    name: "",
    location: "",
    followers: 0,
    following: 0,
    public_repos: 0,
    repos: [],
  });

  useEffect(() => {
    async function loadUser() {
      if (!userId) return;
      try {
        const response1 = await fetch(`https://api.github.com/users/${userId}`);
        const data1 = await response1.json();
        console.log("data1", data1);

        const response2 = await fetch(`https://api.github.com/users/${userId}/repos?per_page=10&sort=stars&direction=desc`);
        const data2 = await response2.json();
        console.log("data2", data2);

        setUser({
          name: data1.name,
          location: data1.location,
          followers: data1.followers,
          following: data1.following,
          public_repos: data1.public_repos,
          repos: data2,
        });
      } catch (error) {
        console.log(error);
      }
    }
    loadUser();
  }, [userId]);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <div>
      <h1>Dados do usuário do Github</h1>
      <p>Nome de usuário: {userId}</p>
      {user && (
        <>
          <div>
            <p>Nome: {user.name}</p>
            <p>Localização: {user.location}</p>
            <p>Seguidores: {user.followers}</p>
            <p>Seguindo: {user.following}</p>
            <p>Repositórios: {user.public_repos}</p>
          </div>
        </>
      )}

      {user.repos.length > 0 && (
        <>
          <p>Repositórios:</p>
          <div>
            <h2>Repositórios</h2>
            <ul>
              {user.repos.map((repo, index) => (
                <li key={index}>
                  <p>{repo.name}</p>
                  <p>{repo.description}</p>
                  <p><FaRegStar /> Stars: {repo.stargazers_count} - <FaCodeFork /> Forks: {repo.forks_count}</p>
                  <p><a href={repo.html_url} target="_blank">Ver código no GitHub</a></p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <p><Link to="/">Voltar</Link></p>
    </div>
  );
}
