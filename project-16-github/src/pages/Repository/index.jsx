import { useParams } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import api from "../../services/api"

import { useState, useEffect, useCallback } from "react"

import { Container, Owner, IssuesList, Loading, BackButton, PageActions } from "./styles"

export default function Repository() {
  const { repository: repositoryParams } = useParams()
  const [loading, setLoading] = useState(true)
  const [repository, setRepository] = useState({})
  const [issues, setIssues] = useState([])

  const [page, setPage] = useState(1)

  useEffect(() => {
    async function loadData() {
      try {
        const [repositoryData, issuesData] = await Promise.all([
          api.get(`repos/${repositoryParams}`),
          api.get(`repos/${repositoryParams}/issues`, {
            params: {
              state: "open",
              per_page: 5,
            },
          }),
        ])
        console.log("respositoryData", repositoryData)
        console.log("issuesData", issuesData)
        setRepository(repositoryData.data)
        setIssues(issuesData.data)
      } catch (error) {
        console.log(error.response.data.message, error.response.data.documentation_url)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [repositoryParams])

  useEffect(() => {
    async function loadData() {
      try {
        const issuesData = await api.get(`repos/${repositoryParams}/issues`, {
          params: {
            state: "open",
            per_page: 5,
            page: page,
          },
        })
        console.log("issuesData", issuesData)
        setIssues(issuesData.data)
      } catch (error) {
        console.log(error.response.data.message, error.response.data.documentation_url)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [repositoryParams, page])

  // console.log("repository", repository)
  // console.log("issues", issues)
  // console.log("loading", loading)

  const handlePage = useCallback((action) => {
    console.log(action)
    if (action === "prev" && page > 1) {
      setPage(page - 1)
    } else if (action === "next") {
      setPage(page + 1)
    }
  }, [page])

  if (loading === true) {
    return (
      <Loading>
        Carregando...
      </Loading>
    )
  }

  return (
    <div>
      <Container>
        <h1>{repositoryParams}</h1>
        {repository.owner && <>
          <Owner>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <h2>{repository.owner.login}</h2>
          </Owner>
          <p>{repository.description}</p>
        </>}
        <p>
          <BackButton to="/"><FaArrowLeft /> Voltar</BackButton>
        </p>
        {issues && <>
          <IssuesList>
            {issues.map((issue) => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map((label) => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssuesList>
          <PageActions>
            <button type="button" onClick={() => handlePage('prev')} disabled={page < 2}>Anterior</button>
            <button type="button" onClick={() => handlePage('next')}>Proximo</button>
          </PageActions>
        </>}
      </Container>
    </div>
  )
}
