import React from 'react'
import { useRouteData } from 'react-static'
import Panel from 'components/panel'
import PostList from 'components/post-list'
import { IPost } from 'types'

const Posts: React.FC = () => {
  const posts = useRouteData<IPost[]>()

  return (
    <Panel>
      <PostList issues={posts}></PostList>
    </Panel>
  )
}

export default Posts
