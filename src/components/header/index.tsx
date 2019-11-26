import React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classnames from 'classnames'
import config from '../../configs/blog.json'
import './index.scss'

const Header: React.FC<RouteComponentProps> = ({ location }) => {
  const path = location.pathname

  const menus = [
    { title: 'Home', icon: 'home', path: '/' },
    {
      title: 'Archives',
      icon: 'archive',
      path: '/archives',
      match: /^(\/archives|\/categories\/|\/tags\/)/,
    },
    ...(config.pages || []),
  ]

  const isActive = (menu: any) =>
    path === menu.path || (menu.match && menu.match.test(path))

  return (
    <section className="m-header m-container">
      <div>
        <h1>{config.title}</h1>
        <p>{config.subtitle}</p>
      </div>
      <ul className="m-navbar">
        {menus.map(menu => (
          <li key={menu.path}>
            <Link
              to={menu.path}
              className={classnames({ active: isActive(menu) })}>
              {menu.icon && <FontAwesomeIcon icon={menu.icon as IconProp} />}
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default withRouter(Header)
