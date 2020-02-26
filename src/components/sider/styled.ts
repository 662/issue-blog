import styled from 'styled-components'

export const Sider = styled.div`
  width: 256px;
  padding-left: 32px;
  border-left: solid 1px #ddd;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
