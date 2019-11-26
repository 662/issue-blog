import React from 'react'

import Header from '../header'
import Footer from '../footer'
import Sider from '../sider'
import './index.scss'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header></Header>
      <section className="m-container m-body">
        <main>{children}</main>
        <Sider />
      </section>
      <Footer></Footer>
    </>
  )
}

export default Layout
