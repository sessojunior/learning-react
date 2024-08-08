import SearchBar from "./SearchBar"

export default function Tabela({ data, setData, order, setOrder, orderBy, setOrderBy, searchData, setSearchData }) {

  const handleOrderBy = (orderBy) => {

    switch (orderBy) {
      case "nome":
        if (order === "asc") {
          setSearchData([...searchData].sort((a, b) => a.nome.localeCompare(b.nome)))
          setOrder("desc")
        } else {
          setSearchData([...searchData].sort((a, b) => b.nome.localeCompare(a.nome)))
          setOrder("asc")
        }
        break
      case "idade":
        if (order === "asc") {
          setSearchData([...searchData].sort((a, b) => a.idade - b.idade))
          setOrder("desc")
        } else {
          setSearchData([...searchData].sort((a, b) => b.idade - a.idade))
          setOrder("asc")
        }
        break
      case "cargo":
        if (order === "asc") {
          setSearchData([...searchData].sort((a, b) => a.cargo.localeCompare(b.cargo)))
          setOrder("desc")
        } else {
          setSearchData([...searchData].sort((a, b) => b.cargo.localeCompare(a.cargo)))
          setOrder("asc")
        }
        break
    }
  }

  const Table = ({ data }) => {
    return (
      <table className="w-full border border-slate-300 rounded">
        <TableHead />
        <TableBody data={data} />
        <TableFoot />
      </table>
    )
  }

  const TableHead = () => {
    return (
      <thead className="rounded-t">
        <tr>
          <th className="text-left font-bold p-2 bg-slate-300 hover:bg-slate-400 cursor-pointer" onClick={() => handleOrderBy("nome")}>Nome</th>
          <th className="text-left font-bold p-2 bg-slate-300 hover:bg-slate-400 cursor-pointer" onClick={() => handleOrderBy("idade")}>Idade</th>
          <th className="text-left font-bold p-2 bg-slate-300 hover:bg-slate-400 cursor-pointer" onClick={() => handleOrderBy("cargo")}>Cargo</th>
        </tr>
      </thead>
    )
  }

  const TableBody = ({ data }) => {
    return (
      <tbody>
        {data.map((item) => (
          <TableRow key={item.nome} value={item} />
        ))}
      </tbody>
    )
  }

  const TableRow = ({ value }) => {
    return (
      <tr className="odd:bg-white even:bg-slate-100 hover:bg-slate-200">
        <td className="p-2">{value.nome}</td>
        <td className="p-2">{value.idade}</td>
        <td className="p-2">{value.cargo}</td>
      </tr>
    )
  }

  const TableFoot = () => {
    return (
      <tfoot>
        <tr className="bg-slate-300">
          <td className="p-2 text-center font-bold" colSpan={3}>Rodapé da tabela</td>
        </tr>
      </tfoot>
    )
  }

  return (
    <>
      <SearchBar data={data} setSearchData={setSearchData} />
      <Table data={searchData} />
    </>
  )
}
