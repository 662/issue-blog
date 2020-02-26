import React from 'react'
import Section from 'src/components/section'
import Navbar from 'src/components/navbar'
import config from 'src/configs/blog.json'

const Header: React.FC = () => {
  return (
    <Section divider>
      <div>
        <h1>{config.title}</h1>
        <p>{config.subtitle}</p>
      </div>
      <Navbar></Navbar>
    </Section>
  )
}

export default Header
