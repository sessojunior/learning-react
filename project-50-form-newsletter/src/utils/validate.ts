import { User } from "../types/User"

type Error = {
  [key: string]: string
}

export const validate = (user: User): Error => {
  const errors: Error = {}

  if (!user?.name) {
    errors.name = "O nome é obrigatório."
  }

  if (!user?.email) {
    errors.email = "O e-mail é obrigatório."
  }

  if (!user?.terms) {
    errors.terms = "Aceite os termos."
  }

  return errors
}
