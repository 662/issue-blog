import React from 'react'

import { HeaderProps } from './header'
// import Footer from './footer'
import { SiderProps } from './sider'
// import Section from './section'

const Layout: React.FC<HeaderProps & SiderProps> = ({
  children,
  // pages,
  // pathname,
  // subtitle,
  // title,
  // categories,
  // tags,
  // posts,
}) => {
  return (
    <>
      {/* <Header
        pages={pages}
        pathname={pathname}
        subtitle={subtitle}
        title={title}></Header>
      <Section style={{ display: 'flex' }}> */}
      <main style={{ flexGrow: 1, maxWidth: 736 }}>{children}</main>
      {/* <Sider categories={categories} tags={tags} posts={posts} />
      </Section>
      <Footer></Footer> */}
    </>
  )
}

export default Layout
