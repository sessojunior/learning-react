import { useContext } from 'react'
import { NomeContext } from '../../contexts/NomeContext'

export default function Nome() {
  const { nome, setNome } = useContext(NomeContext)
  return (
    <div>
      <h3>Nome</h3>
      <p>Componente Nome</p>
      <p>Nome: {nome} - <button onClick={() => setNome('Rafael')}>Alterar para Rafael</button></p>
    </div>
  )
}