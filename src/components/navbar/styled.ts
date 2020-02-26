import styled, { css } from 'styled-components'

export const Navbar = styled.ul`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 -1px 0;
  list-style: none;
`

type NavbarItemProps = { active?: boolean }

export const NavbarItem = styled.li<NavbarItemProps>`
  a {
    font-size: 14px;
    display: block;
    padding: 8px 16px;
    ${props =>
      props.active
        ? css`
            border: solid 1px #ddd;
            border-bottom: solid 1px #fff;
            color: #000;
          `
        : css`
            border: solid 1px transparent;
          `}
    i {
      margin-right: 4px;
    }
    &:hover {
      border-bottom: solid 1px #000;
    }
  }
`
