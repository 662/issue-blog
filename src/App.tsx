import React from 'react'
import { Root, Routes, useSiteData, Head } from 'react-static'
import { Router } from '@reach/router'
import Layout from 'components/layout'
import { ILayout } from 'types'

function Main() {
  const { site, pages, sider } = useSiteData<ILayout>()
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
        <meta name="keywords" content={site.keywords} />
      </Head>
      <Layout
        title={site.title}
        subtitle={site.subtitle}
        pages={pages}
        pathname=""
        categories={sider.categories}
        tags={sider.tags}
        posts={sider.posts}>
        <Router>
          <Routes path="*" />
        </Router>
      </Layout>
    </>
  )
}

function App() {
  return (
    <Root>
      <React.Suspense fallback={<em>Loading...</em>}>
        <Main></Main>
      </React.Suspense>
    </Root>
  )
}

export default App
