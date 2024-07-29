import { useState } from 'react'

export default function ListaDeCompras() {

  type Item = {
    id: number
    name: string
  }

  const [itens, setItens] = useState<Item[]>([])
  const [inputItem, setInputItem] = useState<string>('')

  const handleAddItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newItem = { id: itens.length + 1, name: inputItem }
    setItens([...itens, newItem])
    setInputItem('')
  }

  return (
    <div>
      <h4>Lista de Compras</h4>
      <p>Adicione itens na lista</p>
      <form onSubmit={handleAddItem}>
        <input type="text" name="item" placeholder="Item" value={inputItem} onChange={(e) => setInputItem(e.target.value)} />
        <button type="submit">Adicionar</button>
      </form>
      <p>Quantidade itens na lista: {itens.length}</p>
      {itens.length > 0 && (
        <>
          <p>Itens da lista:</p>
          <ul>
            {itens.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
