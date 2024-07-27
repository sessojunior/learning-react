// Tipos
// boolean, number, string, null, undefined, object, array
const a: number = 10
console.log("a", a)

const b: string = "Texto"
console.log("b", b)

const c: null = null
console.log("c", c)

const d: undefined = undefined
console.log("d", d)

// Arrays e objetos
const e: object = { a: 1, b: "texto" }
console.log("e", e)

const f: number[] = [1, 2, 3]
console.log("f", f)

const g: string[] = ["a", "b", "c"]
console.log("g", g)

const user: { name: string; age: number, mother: string } = {
  name: "João",
  age: 30,
  mother: "Maria"
}
console.log("user", user)

// Tuplas
const rgb: [number, number, number] = [255, 255, 255]
console.log("rgb", rgb)