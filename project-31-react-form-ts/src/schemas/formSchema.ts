import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  lastname: z.string().min(2, { message: "O sobrenome deve ter pelo menos 2 caracteres" }),
  gender: z.enum(["male", "female"], { errorMap: () => ({ message: "Selecione um gênero" }) }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  repeatPassword: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  terms: z.literal(true, { errorMap: () => ({ message: "Aceite os termos de uso" }) }),
}).refine(data => data.password === data.repeatPassword, {
  message: "As senhas precisam ser iguais",
  path: ["repeatPassword"],
})

export type FormSchema = z.infer<typeof formSchema>
