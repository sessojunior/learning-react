export type Alimento = "carne" | "linguica" | "frango" | "paodealho"

export const quantidadePessoas: Record<Alimento, number> = {
  carne: 400,
  linguica: 200,
  frango: 200,
  paodealho: 100,
}

export const nomesAlimentos: Record<string, string> = {
  carne: "Carne",
  linguica: "Linguiça",
  frango: "Frango",
  paodealho: "Pão de Alho",
}
