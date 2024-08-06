import { useState } from "react"
import ImageUpload from "./ImageUpload"
import TextStyle from "./TextStyle"

import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

pdfMake.vfs = pdfFonts.pdfMake.vfs

pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf"
  }
}

export default function Form() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fontsize, setFontsize] = useState(12)
  const [fontcolor, setFontcolor] = useState("#000000")
  const [isBold, setIsBold] = useState(false)
  const [image, setImage] = useState(null)

  function generatePDF() {
    const customStyle = {
      fontSize: fontsize,
      color: fontcolor,
      bold: isBold
    }
    const docDefinition = {
      content: [
        {
          text: title,
          style: "custom"
        },
        {
          text: description,
          style: "custom"
        },
        image ? {
          image: image,
          width: 200
        } : {}
      ],
      styles: {
        custom: customStyle
      }
    }

    pdfMake.createPdf(docDefinition).download()
  }

  return (
    <div className="w-full border border-gray-300 rounded p-8">
      <form>
        <div className="flex flex-col pb-4">
          <label htmlFor="title" className="font-bold pb-2">Titulo</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Digite seu titulo" className="border border-gray-300 rounded p-2" />
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="description" className="font-bold pb-2">Descrição</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Digite sua descrição" className="border border-gray-300 rounded p-2" />
        </div>
        <TextStyle {...{ fontsize, setFontsize, fontcolor, setFontcolor, isBold, setIsBold }} />
        <ImageUpload setImage={setImage} />
        <div className="flex flex-col">
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 font-bold cursor-pointer transition-all select-none" onClick={generatePDF}>Gerar PDF</button>
        </div>
      </form>
    </div>
  )
}
