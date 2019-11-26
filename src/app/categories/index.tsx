import React, { memo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import Panel from '../../components/panel'
import PostList from '../../components/post-list'
import LoadMore from '../../components/load-more'

import QUERY_CATEGORY_POSTS, {
  merge,
  QueryCategoryPostsVariables as Variables,
  QueryCategoryPostsResult as Result,
} from '../../graphql/quey-category-posts'

type PostsParams = { number: string }
type CategoriesProps = RouteComponentProps<PostsParams>

const Categories: React.FC<CategoriesProps> = memo(({ match }) => {
  let variables: Variables = { number: ~~match.params.number, after: null }

  const { data, loading, error, fetchMore } = useQuery<Result, Variables>(
    QUERY_CATEGORY_POSTS,
    { variables, notifyOnNetworkStatusChange: true }
  )

  const posts = data?.repository.milestone.issues.nodes ?? []
  const pageInfo = data?.repository.milestone.issues.pageInfo ?? {
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

export default Categories
