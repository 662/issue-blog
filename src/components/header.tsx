import React from 'react'
import Section from './section'
import Navbar, { NavBarProps } from './navbar'

export interface HeaderProps extends NavBarProps {
  title?: string
  subtitle?: string
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  pathname,
  pages,
}) => {
  return (
    <Section divider>
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <Navbar pathname={pathname} pages={pages}></Navbar>
    </Section>
  )
}

export default Header
