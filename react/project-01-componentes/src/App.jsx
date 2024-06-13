import './App.css'
import PropTypes from "prop-types"
import { useEffect, useState } from 'react'

const Equipe = ({ name, cargo, idade, fb }) => {
  return (
    <>
      <p>Olá! Sou o {name} teste</p>
      <Sobre cargo={cargo} idade={idade} fb={fb} />
      <hr />
    </>
  )
}

Equipe.propTypes = {
  name: PropTypes.string,
  cargo: PropTypes.string,
  idade: PropTypes.number,
  fb: PropTypes.string,
}

const Sobre = ({ cargo, idade, fb }) => {
  return (
    <>
      <p>Eu sou {cargo}, tenho {idade}</p>
      <Social fb={fb} />
    </>
  )
}

Sobre.propTypes = {
  cargo: PropTypes.string,
  idade: PropTypes.number,
  fb: PropTypes.string,
}

const Social = ({fb}) => {
  return (
    <p>Meu facebook é {fb}</p>
  )
}

Social.propTypes = {
  fb: PropTypes.string,
}

// TODO: ERROR
const Time = () => {
  //console.log("Renderizou o time")
  const [horario, setHorario] = useState(new Date().toLocaleTimeString())
  
  useEffect(() => {
    setInterval(() => {
      setHorario(new Date().toLocaleTimeString())
    }, 1000)
  }, [])

  return (
    <strong>--[{horario}]--</strong>
  )
}

function App() {
  console.log("Renderizou o App")

  return (
    <>
      <p>Conheça nossa equipe:</p>
      <Equipe name="Rafael" cargo="Programador" idade={42} />
      <Equipe name="Fernanda" cargo="Designer" idade={34} />
      <Time />
    </>
  )
}

export default App
