import React from 'react'
import Navbar from './navbar'
import config from '../../configs/blog.json'
import './index.scss'

const Header: React.FC = () => {
  return (
    <section className="m-header m-container">
      <div>
        <h1>{config.title}</h1>
        <p>{config.subtitle}</p>
      </div>
      <Navbar></Navbar>
    </section>
  )
}

export default Header
