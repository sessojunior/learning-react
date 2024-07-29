import FormularioLogin from "./FormularioLogin"
import ListaDeCompras from "./ListaDeCompras"
import ValorLocalStorage from "./ValorLocalStorage"

export default function Exercises() {
  return (
    <div>
      <h2>Exercícios</h2>

      <h3>1. Tipagem de formulário com Estado e Eventos</h3>

      <p>Crie um componente FormularioLogin com campos para nome de usuário e senha. O componente deve utilizar o estado para armazenar os valores dos campos e lidar com a submissão do formulário exibindo um alerta com o nome de usuário e senha inseridos.</p>

      <FormularioLogin />

      <h3>2. Lista Dinâmica com Estado e Props</h3>

      <p>Crie um componente ListaDeCompras que permite adicionar itens a uma lista de compras. O componente deve conter um input para inserir o nome do item e um botão para adicionar o item à lista. A lista de itens deve ser renderizada abaixo do formulário de edição.</p>

      <ListaDeCompras />

      <h3>3. Hook Customizado para armazenar no Local Storage</h3>

      <p>Crie um hook customizado useLocalStorage que permita armazenar e recupar um valor do localStorage do navegador. O hook deve aceitar uma chave de localStorage e o valor inicial.</p>

      <ValorLocalStorage />
    </div>
  )
}
