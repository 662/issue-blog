import styled from 'styled-components'

type ButtonProps = {
  primary?: boolean
  bordered?: boolean
}

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  border: solid 1px
    ${props => (props.bordered !== false ? 'gray' : 'transparent')};
  border-radius: 4px;
  padding: 0 16px;
  height: 32px;
  margin-right: 8px;
  font-size: 12px;
  background: ${props => (props.primary ? 'gray' : 'white')};
  color: ${props => (props.primary ? 'white' : 'gray')};
  &:hover {
    color: #000;
  }
`
export default Button
