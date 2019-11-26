import React, { memo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import Panel from '../../components/panel'
import PostList from '../../components/post-list'
import LoadMore from '../../components/load-more'

import QUERY_POSTS, {
  merge,
  QueryPostsVariables as Variables,
  QueryPostsResult as Result,
} from '../../graphql/query-posts'

type PostsParams = { name: string }

const Tags: React.FC<RouteComponentProps<PostsParams>> = memo(({ match }) => {
  let variables: Variables = { labels: [match.params.name], after: null }

  const { data, loading, error, fetchMore } = useQuery<Result, Variables>(
    QUERY_POSTS,
    { variables, notifyOnNetworkStatusChange: true }
  )

  const posts = data?.repository.issues.nodes ?? []
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
      <PostList issues={posts}></PostList>
      <LoadMore
        loading={loading}
        error={error}
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}></LoadMore>
    </Panel>
  )
})

export default Tags
