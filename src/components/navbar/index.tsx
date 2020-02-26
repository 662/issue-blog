import React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import * as styled from './styled'
import config from '../../configs/blog.json'

const Navbar: React.FC<RouteComponentProps> = ({ location }) => {
  const path = location.pathname

  const menus = [
    { title: 'Home', icon: 'home', path: '/' },
    {
      title: 'Archives',
      icon: 'archive',
      path: '/archives',
      match: /^(\/archives|\/categories\/|\/tags\/|\/posts\/)/,
    },
    ...(config.pages || []),
  ]

  const isActive = (menu: any) =>
    path === menu.path || (menu.match && menu.match.test(path))

  return (
    <styled.Navbar>
      {menus.map(menu => (
        <styled.NavbarItem key={menu.path} active={isActive(menu)}>
          <Link to={menu.path}>
            {menu.icon && <i className={`fas fa-${menu.icon}`}></i>}
            {menu.title}
          </Link>
        </styled.NavbarItem>
      ))}
    </styled.Navbar>
  )
}

export default withRouter(Navbar)
