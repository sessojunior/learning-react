import { useEffect, useState } from "react"

import { IcoAirplane, IcoChevronLeft, IcoChevronRight, IcoFaceFrown, IcoFaceSmile, IcoHandThumbDown, IcoHandThumbUp, IcoStar, IcoUser, IcoHandThumbDownSolid, IcoHandThumbUpSolid, IcoFaceFrownSolid, IcoFaceSmileSolid, IcoStarSolid, IcoAirplaneSolid, IcoUserSolid } from "./Icons";


export default function Form() {

  const [step, setStep] = useState(1)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [rating, setRating] = useState(3)
  const [comment, setComment] = useState("")

  const handleStep = (toStep) => {
    if (toStep === "previous") {
      console.log("toStep previous", toStep)
      setStep(step - 1)
    } else if (toStep === "next") {
      if (step === 1) {
        if (!name || !email) {
          alert("Preencha seu nome e e-mail!")
          return
        }
      }
      if (step === 2) {
        if (!rating || !comment) {
          alert("Não esqueça de avaliar a compra e comentar algo!")
          return
        }
      }
      console.log("toStep next", toStep)
      setStep(step + 1)
    } else {
      return
    }
  }

  const handleSubmit = () => {
    alert(`Nome: ${name}, Email: ${email}, Avaliação: ${rating}, Comentário: ${comment}`)
  }

  useEffect(() => {
    console.log("step", step)
  }, [step])
  
  return (
    <div className="flex flex-col gap-4 w-[480px] p-8 border border-gray-300 bg-white rounded-md">

      {/* Steps icons */}
      <div className="flex flex-col w-full px-4 pb-8 border-b border-gray-300">
        <ul className="grid grid-cols-3">
          <li className="flex flex-col items-center">
            <div className="p-2">{step === 1 ? <IcoUserSolid /> : <IcoUser />}</div>
            <div className="font-medium">Identificação</div>
          </li>
          <li className="flex flex-col items-center">
            <div className="p-2">{step === 2 ? <IcoStarSolid /> : <IcoStar />}</div>
            <div className="font-medium">Avaliação</div>
          </li>
          <li className="flex flex-col items-center">
            <div className="p-2">{step === 3 ? <IcoAirplaneSolid /> : <IcoAirplane />}</div>
            <div className="font-medium">Envio</div>
          </li>
        </ul>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="flex flex-col w-full pt-4 pb-8">
          <div className="pb-4">
            <label htmlFor="name" className="block font-medium pb-2">Nome</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" className="border border-gray-300 rounded p-2 w-full" />
          </div>
          <div className="pb-4">
            <label htmlFor="email" className="block font-medium pb-2">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu email" className="border border-gray-300 rounded p-2 w-full" />
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="flex flex-col w-full pt-4 pb-8">
          <div className="pb-8">
            <p className="block font-medium pb-4">Qual é a sua avaliação?</p>
            <ul className="flex justify-center gap-4">
              <li>
                <label htmlFor="rating-1" className="flex flex-col items-center gap-2 cursor-pointer">
                  <div className="flex justify-center p-1">{rating === 1 ? <IcoFaceFrownSolid /> : <IcoFaceFrown />}</div>
                  <div className="text-sm text-center">Insatisfeito</div>
                </label>
                <input type="radio" value={1} onChange={(e) => setRating(Number(e.target.value))} id="rating-1" checked={rating === 1} className="hidden" />
              </li>
              <li>
                <label htmlFor="rating-2" className="flex flex-col items-center gap-2 cursor-pointer">
                  <div className="flex justify-center p-1">{rating === 2 ? <IcoHandThumbDownSolid /> : <IcoHandThumbDown />}</div>
                  <div className="text-sm text-center">Poderia ser melhor</div>
                </label>
                <input type="radio" value={2} onChange={(e) => setRating(Number(e.target.value))} id="rating-2" checked={rating === 2} className="hidden" />
              </li>
              <li>
                <label htmlFor="rating-3" className="flex flex-col items-center gap-2 cursor-pointer">
                  <div className="flex justify-center p-1">{rating === 3 ? <IcoHandThumbUpSolid /> : <IcoHandThumbUp />}</div>
                  <div className="text-sm text-center">Satisfeito</div>
                </label>
                <input type="radio" value={3} onChange={(e) => setRating(Number(e.target.value))} id="rating-3" checked={rating === 3} className="hidden" />
              </li>
              <li>
                <label htmlFor="rating-4" className="flex flex-col items-center gap-2 cursor-pointer">
                  <div className="flex justify-center p-1">{rating === 4 ? <IcoFaceSmileSolid /> : <IcoFaceSmile />}</div>
                  <div className="text-sm text-center">Muito satisfeito</div>
                </label>
                <input type="radio" value={4} onChange={(e) => setRating(Number(e.target.value))} id="rating-4" checked={rating === 4} className="hidden" />
              </li>
            </ul>
          </div>
          <div className="pb-4">
            <label htmlFor="comment" className="block font-medium pb-2">Comentário</label>
            <textarea name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Conte como foi sua experiência ao realizar a compra." className="border border-gray-300 rounded p-2 w-full h-40"></textarea>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="flex flex-col w-full pt-4 pb-8">
          <div className="pb-4">
            <h2 className="font-bold text-2xl pb-4">Falta pouco...</h2>
            <p className="pb-2">A sua opinião é muito importante. Em breve você receberá um cupom de desconto para a sua próxima compra.</p>
            <p className="pb-2">Para concluir sua avaliação, clique no botão de enviar abaixo.</p>
            <p className="pb-2 font-medium">Aqui está o resumo de sua avaliação:</p>
            <p><span className="font-medium">Nome: </span> {name}</p>
            <p className="pb-2"><span className="font-medium">E-mail: </span> {email}</p>
            <div className="pb-2"><span className="font-medium">Avaliação: </span>
              <div className="flex gap-2 items-center">
                <div>Nota {rating}</div>
                <div>
                  <span className="inline-block pt-1">
                    {rating === 1 && <IcoFaceFrown />}
                    {rating === 2 && <IcoHandThumbDown />}
                    {rating === 3 && <IcoHandThumbUp />}
                    {rating === 4 && <IcoFaceSmile />}
                  </span>
                </div>
              </div>
            </div>
            <p><span className="font-medium">Comentário: </span></p>
            <p>{comment}</p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="px-8 pb-4 flex justify-end gap-4">
        {step !== 1 && (
          <button className="bg-gray-500 text-white rounded pl-3 pr-6 py-2 hover:bg-gray-600 cursor-pointer flex items-center gap-1" onClick={() => handleStep("previous")}><span className="inline-block"><IcoChevronLeft /></span> Voltar</button>
        )}
        {step !== 3 ? (
          <button className="bg-blue-500 text-white rounded pl-6 pr-3 py-2 hover:bg-blue-600 cursor-pointer flex items-center gap-1" onClick={() => handleStep("next")}>Avançar <span className="inline-block"><IcoChevronRight /></span></button>
        ) : (
          <button className="bg-blue-500 text-white rounded pl-6 pr-3 py-2 hover:bg-blue-600 cursor-pointer flex items-center gap-1" onClick={handleSubmit}>Enviar <span className="inline-block"><IcoAirplane /></span></button>
        )}
      </div>
    </div>
  )
}
