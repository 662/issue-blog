import { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import config from '../configs/blog.json'

import SEARCH, {
  merge,
  SearchVariables as Variables,
  SearchResult as Result,
} from '../graphql/search'

type Params = {
  milestone?: string
  label?: string
}

const usePosts = ({ milestone, label }: Params = {}) => {
  let query = `repo:${config.github.repository.owner}/${config.github.repository.name} assignee:${config.github.repository.assignee}`
  if (milestone) query += ` milestone:${milestone}`
  if (label) query += ` label:${label}`

  const variables: Variables = { query, after: null }

  const { data, loading, error, fetchMore, refetch } = useQuery<
    Result,
    Variables
  >(SEARCH, { variables, notifyOnNetworkStatusChange: true })

  const posts = data?.search.nodes ?? []
  const { endCursor, hasNextPage } = data?.search.pageInfo ?? {
    endCursor: null,
    hasNextPage: false,
  }

  const loadMore = useCallback(() => {
    fetchMore({
      variables: { ...variables, after: endCursor },
      updateQuery: (prev, { fetchMoreResult: next }) =>
        next ? merge(prev, next) : prev,
    })
  }, [fetchMore, variables, endCursor])

  return {
    posts,
    hasNextPage,
    loading,
    error,
    loadMore,
    refetch,
  }
}

export default usePosts
