import useLocalStorage from "../hooks/useLocalStorage"

export default function ValorLocalStorage() {

  const [nome, setNome] = useLocalStorage<string>('nome', '')

  return (
    <div>
      <h4>Recuperar valor do localStorage</h4>
      <div>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      </div>
      <p>Nome no localStorage: {nome}</p>
    </div>
  )
}
