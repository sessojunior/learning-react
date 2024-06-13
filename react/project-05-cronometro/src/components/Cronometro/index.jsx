import ImgCronometro from '../../assets/cronometro.png'
import Botao from '../Botao'
import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'

const StyledCronometro = styled.div`
  .container {
    position: relative;
    margin-bottom: 20px;
  }
  .label {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    padding-top: 10px;
  }
  img {
    
  }
`


export default function Cronometro() {
  const [timer, setTimer] = useState(0)
  const currentTimer = useRef()

  useEffect(() => {
    return () => {
      clearInterval(currentTimer.current)
    }
  }, [])

  const startTimer = () => {
    currentTimer.current = setInterval(() => {
      setTimer((t) => t + 0.1)
    }, 100)
  }

  const stopTimer = () => {
    clearInterval(currentTimer.current)
    console.log('Cronometro parado')
  }

  const resetTimer = () => {
    clearInterval(currentTimer.current)
    setTimer(0)
  }

  return (
    <>
      <StyledCronometro>
        <div className="container">
          <img src={ImgCronometro} alt="Cronômetro" />
          <div className="label">{timer.toFixed(1)}</div>
        </div>
      </StyledCronometro>
      <div>
        <Botao click={startTimer}>Iniciar</Botao>
        <Botao click={stopTimer}>Parar</Botao>
        <Botao click={resetTimer}>Resetar</Botao>
      </div>
    </>
  )
}
