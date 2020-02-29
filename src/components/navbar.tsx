import React from 'react'
import { Link } from '@reach/router'
import styled, { css } from 'styled-components'
import { IPage } from 'types'

const StyledNavbar = styled.ul`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 -1px 0;
  list-style: none;
`

const StyledNavbarItem = styled.li<{ active?: boolean }>`
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

export interface NavBarProps {
  pathname?: string
  pages?: IPage[]
}

const Navbar: React.FC<NavBarProps> = ({ pathname = '/', pages = [] }) => {
  const menus: IPage[] = [
    { title: 'Home', icon: 'home', path: '/' },
    {
      title: 'Archives',
      icon: 'archive',
      path: '/archives',
      match: /^(\/archives|\/categories\/|\/tags\/|\/post\/)/,
    },
    ...(pages || []),
  ]

  const isActive = (menu: any) =>
    pathname === menu.path || (menu.match && menu.match.test(pathname))

  return (
    <StyledNavbar>
      {menus.map(menu => (
        <StyledNavbarItem key={menu.path} active={isActive(menu)}>
          <Link to={menu.path}>
            {menu.icon && <i className={`fas fa-${menu.icon}`}></i>}
            {menu.title}
          </Link>
        </StyledNavbarItem>
      ))}
    </StyledNavbar>
  )
}

export default Navbar
