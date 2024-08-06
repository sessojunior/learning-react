

export default function TextStyle({ fontsize, setFontsize, fontcolor, setFontcolor, isBold, setIsBold }) {

  return (
    <>
      <div className="flex flex-col pb-4">
        <label htmlFor="fontsize" className="font-bold pb-2">Tamanho da fonte</label>
        <input type="number" min="10" max="100" value={fontsize} onChange={(e) => setFontsize(e.target.value)} placeholder="0" id="fontsize" className="border border-gray-300 rounded p-2" />
      </div>
      <div className="flex flex-col pb-4">
        <label htmlFor="fontcolor" className="font-bold pb-2">Cor da fonte</label>
        <input type="color" id="fontcolor " value={fontcolor} onChange={(e) => setFontcolor(e.target.value)} className="border border-gray-300 rounded h-10 p-1 cursor-pointer" />
      </div>
      <div className="flex items-center h-10 pb-4">
        <input type="checkbox" name="bold" checked={isBold} onChange={(e) => setIsBold(e.target.checked)} id="bold" className="mr-1 h-5 w-5 rounded cursor-pointer" />
        <label htmlFor="bold" className="block cursor-pointer">Negrito</label>
      </div>
    </>
  )
}
