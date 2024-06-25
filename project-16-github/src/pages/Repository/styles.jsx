import styled from "styled-components"
import { Link } from "react-router-dom"

export const Container = styled.div`
  max-width: 500px;
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;
  margin: 80px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;

    svg {
      margin-right: 10px;
    }
  }
`

export const Loading = styled.h2`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Owner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 10px;
  }

  h2 {
    font-size: 16px;
    line-height: 20px;
    color: #0d2636;
  }

  p {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
  }
`

export const IssuesList = styled.ul`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 10px;
    }

    div {
      flex: 1;
      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }
        span {  
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`

export const BackButton = styled(Link)`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: opacity 0.2s;
  color: #0d2636;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }

  svg {
    margin-right: 5px;
  }
`
export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  button {
    outline: 0;
    border: 0;
    background: #7159c1;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`
