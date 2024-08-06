

export default function Result({ taxData }) {
  return (
    <div className="w-full p-8 flex flex-col justify-center border border-gray-300 bg-slate-50 rounded mt-8">
      <h2 className="text-xl font-bold text-center">Relatório de impostos</h2>
      <div className="mt-8">
        <p><b>Nome:</b> {taxData.name}</p>
        <p><b>Idade:</b> {taxData.age} anos</p>
        <p><b>Renda:</b> {parseFloat(taxData.income).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p><b>Imposto a pagar:</b> {parseFloat(taxData.tax).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      </div>
    </div>
  )
}
