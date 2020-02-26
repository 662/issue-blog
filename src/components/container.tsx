import styled from 'styled-components'

type ContainerProps = {
  spaced?: boolean
  width?: number
  size?: 'small' | 'default' | 'large'
}

const sizes = {
  small: 8,
  default: 16,
  large: 32,
}

const Container = styled.div<ContainerProps>`
  width: ${props => (props.width ? props.width + 'px' : 'auto')};
  padding: ${props => sizes[props.size || 'default']}px;
  ${props => props.spaced !== false && `margin-bottom: 32px`}
`

export default Container
