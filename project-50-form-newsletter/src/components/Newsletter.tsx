import { useState, FormEvent } from "react"
import { User } from "../types/User"
import { validate } from "../utils/validate"

export default function Newsletter() {
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState<User>({})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setErrors({})

    const user: User = {
      name,
      email,
      terms
    }

    const validationErrors = validate(user)

    if (Object.keys(validationErrors).length > 0) {
      console.log("validationErrors", validationErrors)
      setErrors(validationErrors)
    } else {
      alert("Formulaário enviado com sucesso!\nNome: " + name + "\nE-mail: " + email + "\nAceita os termos: " + terms)
    }
  }

  return (
    <div className="w-[480px]">
      <h1 className="text-2xl font-bold text-center pb-2 text-white">Inscreva-se</h1>
      <p className="text-center pb-4 text-white">Assine nossa Newsletter e mantenha-se informado</p>
      <div className="border border-blue-700 bg-gray-50 rounded-md p-4">
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <label htmlFor="name" className="block pb-2">Nome</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          {errors?.name && <div className="text-red-500 text-sm pb-4">{errors.name}</div>}
          <div className="pb-4">
            <label htmlFor="email" className="block pb-2">E-mail</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu melhor e-mail" className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          {errors?.email && <div className="text-red-500 text-sm pb-4">{errors.email}</div>}
          <div className="pb-4">
            <div className="flex items-center">
              <input type="checkbox" name="terms" id="terms" checked={terms} onChange={() => setTerms(!terms)} className="mr-2 h-4 w-4 cursor-pointer" />
              <label htmlFor="terms" className="block cursor-pointer">Concordo com os <a href="#">termos</a>.</label>
            </div>
          </div>
          {errors && <div className="text-red-500 text-sm pb-4">{errors.terms}</div>}
          <div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Inscrever-se</button>
          </div>
        </form>
      </div>
      <p className="text-center pt-4 text-white">Ao se inscrever, você passará a receber os nossos e-mails com as melhores dicas, novidades e ofertas.</p>
    </div>
  )
}
