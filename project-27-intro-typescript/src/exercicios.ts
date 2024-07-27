// Exercícios

/*
1. Trabalhando com interfaces

Defina uma interface Vehicule que representa um veículo, com propriedades make(marca), model(modelo) e year(ano).
Crie uma função que aceite Vehicule como argumento e imprima uma descrição do veículo.
*/

interface Vehicule {
  make: string
  model: string
  year: number
}

function describeVehicule(vehicule: Vehicule): string {
  return `O veículo ${vehicule.make} modelo ${vehicule.model} do ano ${vehicule.year}`
}

const myCar1: Vehicule = { make: "Ford", model: "Fiesta", year: 2019 }
const myCar2: Vehicule = { make: "Volkswagen", model: "Golf", year: 2020 }
const myCar3: Vehicule = { make: "Toyota", model: "Corolla", year: 2021 }

console.log(describeVehicule(myCar1))
console.log(describeVehicule(myCar2))
console.log(describeVehicule(myCar3))


/* 
2. Genéricos em funções

Crie uma função genérica firstElement que retorne o primeiro item de um array.
A função deve ser capaz de trabalhar com qualquer tipo de dado.
*/

function firstElement<T>(arr: T[]): T {
  return arr[0]
}

console.log(firstElement([1, 2, 3]))
console.log(firstElement(["a", "b", "c"]))
console.log(firstElement([]))


/* 
3. Uso de Readonly e Partial

Dado o tipo Product abaixo, crie uma função freezeProduct que torne um produto imutável.
Em seguida, crie outra função updateProductPrice que atualize apenas o preço de um produto, demonstrando o uso de Partial.

Product = id, name, price
*/

type Product = {
  id: number
  name: string
  price: number
}

function freezeProduct<Product>(product: Product): Readonly<Product> {
  return product
}

const product: Product = {
  id: 1,
  name: "Produto 1",
  price: 10
}
const bread: Product = { id: 1, name: "Pão", price: 1.99 }

console.log(freezeProduct(product))
console.log(freezeProduct(bread))



function updateProductPrice<Product>(product: Product, price: number): Partial<Product> {
  return { ...product, price }
}

console.log(updateProductPrice(product, 20))
console.log(updateProductPrice(bread, 20))
