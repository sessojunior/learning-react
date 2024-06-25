import { Link } from "react-router-dom"
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa"
import { useRef, useEffect } from "react"
import { toast } from "react-toastify"

import api from "../../services/api"

import { Container, Form, SubmitButton, List, DeleteButton } from "./styles"
import { useState, useCallback } from "react"

export default function Home() {
  const input = useRef("")
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const repositoriesStorage = localStorage.getItem("repositories")
    if (repositoriesStorage) {
      setRepositories(JSON.parse(repositoriesStorage))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("repositories", JSON.stringify(repositories))
  }, [repositories])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    async function submit() {
      console.log(input.current.value) // Ex: facebook/react

      setLoading(true)
      try {
        if (!input.current.value) {
          toast.error("Preencha o campo corretamente.")
          throw new Error("Preencha o campo corretamente")
        }

        const response = await api.get(`repos/${input.current.value}`) // Ex: repos/facebook/react
        // console.log(response.data)
        const data = {
          id: response.data.id,
          name: response.data.full_name,
        }

        const hasRepository = repositories.find((repository) => repository.id === data.id)
        if (hasRepository) {
          toast.error("Repositório já está na lista.")
          throw new Error("Repositório duplicado")
        }

        setRepositories([...repositories, data])
        toast.success("Repositório adicionado com sucesso")
      } catch (error) {
        console.log(error)
      } finally {
        // input.current.value = ""
        setLoading(false)
      }
    }
    submit()
  }, [repositories])

  const handleDelete = useCallback((id) => {
    const repositoriesUpdated =  repositories.filter((repository) => repository.id !== id)
    setRepositories(repositoriesUpdated)
    toast.success("Repositório excluído com sucesso")
  }, [repositories])

  console.log("Renderizou")

  return (
    <div>
      <Container>
        <h1>
          <FaGithub size={32} color="#ff0000" /> Meus repositórios
        </h1>
        <Form onSubmit={handleSubmit}>
          <input type="text" placeholder="Adicionar repositório (ex: facebook/react)" ref={input} />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map((repository) => (
            <li key={repository.id}>
              <span>
                <DeleteButton onClick={() => handleDelete(repository.id)}>
                  <FaTrash color="#000" size={14} />
                </DeleteButton>
                {repository.name}
              </span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                <FaBars color="#000" size={20} />
              </Link>
            </li>
          ))}
        </List>
      </Container>
    </div>
  )
}
