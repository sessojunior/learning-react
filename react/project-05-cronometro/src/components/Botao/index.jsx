import styled from "styled-components"
import PropTupes from "prop-types"

const StyledButton = styled.span`
  button {
    display: inline-block;
    background-color: #fff;
    color: #000;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin: 0 10px;
    font-size: 16px;
    cursor: pointer;
  }
`

export default function Botao({ children, click }) {
  return (
    <StyledButton>
      <button onClick={click}>{children}</button>
    </StyledButton>
  )
}

Botao.propTypes = {
  children: PropTupes.node.isRequired,
  click: PropTupes.func.isRequired
}