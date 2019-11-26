import React, { memo, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { IIssue } from '../../interfaces'
import Panel from '../../components/panel'
import LoadMore from '../../components/load-more'
import PostList from '../../components/post-list'
import QUERY_POSTS, {
  merge,
  QueryPostsResult as Result,
  QueryPostsVariables as Variables,
} from '../../graphql/query-posts'

type Archive = {
  title: string
  posts: IIssue[]
}

const Archives: React.FC = memo(() => {
  let variables: Variables = { after: null, labels: null }

  const { loading, error, data, fetchMore, refetch } = useQuery<
    Result,
    Variables
  >(QUERY_POSTS, { variables, notifyOnNetworkStatusChange: true })

  const archives = useMemo(() => {
    if (!data) return []
    return data.repository.issues.nodes.reduce<Archive[]>((prev, post) => {
      const title = new Date(post.createdAt).getFullYear().toString()
      const i = prev.findIndex(item => item.title === title)
      if (i > -1) prev[i].posts.push(post)
      else prev.push({ title, posts: [post] })
      return prev
    }, [])
  }, [data])

  const pageInfo = data?.repository.issues.pageInfo ?? {
    endCursor: null,
    hasNextPage: false,
  }

  const loadMore = () => {
    fetchMore({
      variables: { ...variables, after: pageInfo.endCursor },
      updateQuery: (prev, { fetchMoreResult: next }) =>
        next ? merge(prev, next) : prev,
    })
  }

  return (
    <Panel>
      {archives.map(archive => (
        <div key={archive.title}>
          <h2>{archive.title}</h2>
          <PostList issues={archive.posts} showYear={false}></PostList>
        </div>
      ))}
      <LoadMore
        onRefresh={refetch}
        loading={loading}
        error={error}
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}></LoadMore>
    </Panel>
  )
})

export default Archives
