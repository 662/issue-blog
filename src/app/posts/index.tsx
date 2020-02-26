import React, { memo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Panel from '../../components/panel'
import PostList from '../../components/post-list'
import LoadMore from '../../components/load-more'
import usePosts from '../../hooks/usePosts'

type PostsProps = RouteComponentProps<{
  title: string
}>

const Posts: React.FC<PostsProps> = memo(({ match }) => {
  const params = { milestone: '', label: '' }
  const title = match.params.title
  if (match.path === '/categories/:title') params.milestone = title
  else if (match.path === '/tags/:title') params.label = title

  const { posts, loading, error, loadMore, refetch, hasNextPage } = usePosts(
    params
  )

  return (
    <Panel>
      {title && <h2>{title}</h2>}
      <PostList issues={posts}></PostList>
      <LoadMore
        onRefresh={refetch}
        loading={loading}
        error={error}
        hasNextPage={true}
        loadMore={loadMore}></LoadMore>
    </Panel>
  )
})

export default Posts
