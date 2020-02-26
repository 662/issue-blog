import React from 'react'

import Header from '../header'
import Footer from '../footer'
import Sider from '../sider'
import Section from '../section'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header></Header>
      <Section style={{ display: 'flex' }}>
        <main style={{ flexGrow: 1, maxWidth: 736 }}>{children}</main>
        <Sider />
      </Section>
      <Footer></Footer>
    </>
  )
}

export default Layout
