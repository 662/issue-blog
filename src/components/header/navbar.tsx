import React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import classnames from 'classnames'
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
    <ul className="m-navbar">
      {menus.map(menu => (
        <li key={menu.path}>
          <Link
            to={menu.path}
            className={classnames({ active: isActive(menu) })}>
            {menu.icon && <i className={`fas fa-${menu.icon}`}></i>}
            {menu.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default withRouter(Navbar)
