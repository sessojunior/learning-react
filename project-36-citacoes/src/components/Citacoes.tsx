import { useEffect, useState } from "react";
import citacoes from "../data/citacoes"

interface Citacoes {
  author: string
  description: string
}

export default function Citacoes() {

  const [citacao, setCitacao] = useState({} as Citacoes);

  function randomCitacao() {
    setCitacao(citacoes[Math.floor(Math.random() * citacoes.length)]);
  }

  useEffect(() => {
    randomCitacao()
  }, [])

  function handleNext() {
    randomCitacao()
  }

  // async function translate(language: string, text: string) {
  //   console.log("language, text", language, text)
  //   try {
  //     const response = await fetch("https://pt.libretranslate.com/translate", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         q: text,
  //         source: "pt",
  //         target: language,
  //         format: "text",
  //       }),
  //       headers: { "Content-Type": "application/json" }
  //     });
  //     const data = await response.json()
  //     console.log("data", data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div>
      <cite>
        <p className="text-xl font-medium text-center">"{citacao.description}"</p>
        <p className="text-lg text-center">— {citacao.author}</p>
      </cite>
      <div className="flex justify-center pt-8">
        <button className="mx-2 py-2 px-4 bg-green-700 text-white rounded hover:bg-green-900 transition-all" onClick={handleNext}>Próxima citação</button>
      </div>
      {/* <div className="flex justify-center pt-8">
        <button className="mx-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all" onClick={() => translate("en", citacao.description)}>Traduzir para Inglês</button>
        <button className="mx-2 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 transition-all" onClick={() => translate("es", citacao.description)}>Traduzir para Espanhol</button>
      </div> */}
    </div>
  )
}