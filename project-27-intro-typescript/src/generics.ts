// Generics
// Função do tipo genérico, não fique restringida a um tipo x, mas aceite qualquer coisa

// Função com arrays e que retorna um array genérico
function getArray<T>(items: T[]): T[] {
  return new Array<T>().concat(items)
}
let numberArray = getArray<number>([5, 10, 15, 20])
let stringArray = getArray<string>(["Cats", "Dogs", "Birds"])
console.log(numberArray)
console.log(stringArray)

// Restringir tipos
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return {...objA, ...objB}
}
const mergedObj = merge({ name: "João", age: 30 }, { job: "Programador", isActive: true })
console.log(mergedObj)

// Utilitários de tipo
type Todo = {
  title: string
  description: string
  completed: boolean
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate }
}
const todoInicial = {
  title: "Teste",
  description: "Alguma coisa",
  completed: false
}
const todoAtualizado = updateTodo(todoInicial, { completed: true })
console.log(todoAtualizado)

// Somente leitura
const meuSegundoTodo: Readonly<Todo> = {
  title: "Teste",
  description: "Alguma coisa",
  completed: false
}
console.log(meuSegundoTodo)