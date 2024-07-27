// Interfaces
// Tabelas -> entidades: Usuário -> nome, email, senha
// Back -> Front

// Interfaces -> Mapear todos os campos
interface User {
  id: number
  name: string
  email: string
  password: string
  isActive: boolean
}

// Utilizando interfaces para criar classes
const myUser: User = {
  id: 1,
  name: "João",
  email: "joao@teste.com",
  password: "123456",
  isActive: true
}

console.log(myUser)

// Classes
class Person implements User {
  id: number
  name: string
  email: string
  password: string
  isActive: boolean

  constructor(id: number, name: string, email: string, password: string, isActive: boolean) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.isActive = isActive
  }

  greet() {
    console.log("Olá, meu nome é " + this.name)
  }
}

const myPerson = new Person(1, "João", "joao@teste.com", "123456", true)
console.log(myPerson)
console.log(myPerson.greet())
