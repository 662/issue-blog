import path from 'path'
import fetchSider from './service/fetch-sider'
import fetchPosts from './service/fetch-posts'
import fetchPost from './service/fetch-post'
import config from './config/blog.json'

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  siteRoot: config.site.url,
  getSiteData: async ({ dev }) => {
    const sider = await fetchPosts()

    return {
      site: config.site,
      sider,
      pages: config.pages,
      lastBuilt: Date.now(),
    }
  },
  getRoutes: async () => {
    const posts = await fetchPosts()
    const pageRoutes = config.pages.map(page => ({
      path: page.path,
      template: 'src/containers/page',
      getData: async () => {
        const post = await fetchPost(page.issueNumber)
        return {
          ...page,
          post,
        }
      },
    }))
    const postRoutes = posts.map(post => ({
      path: `/post/${post.id}`,
      template: 'src/containers/post',
      getData: () => post,
    }))
    return [
      { path: '/', getData: () => ({ posts }) },
      ...postRoutes,
      ...pageRoutes,
    ]
  },
  plugins: [
    'react-static-plugin-typescript',
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}
