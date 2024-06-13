import imgBiscoito from "../../assets/biscoito.png"
import styled from "styled-components"

const StyledBiscoito = styled.div`
  .biscoito {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;

    img {
      width: 50%;
      height: auto;
    }
  }
`

export default function Biscoito() {
  return (
    <StyledBiscoito>
      <div className="biscoito">
        <img src={imgBiscoito} alt="Biscoito da sorte" />
      </div>
    </StyledBiscoito>
  )
}
