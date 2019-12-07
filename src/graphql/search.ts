import { gql } from 'apollo-boost'
import { ISearchResult } from '../interfaces'

export type SearchResult = ISearchResult

export type SearchVariables = {
  query: string
  after: string | null
}

export function merge(prev: SearchResult, next: SearchResult): SearchResult {
  return {
    search: {
      ...prev.search,
      pageInfo: next.search.pageInfo,
      nodes: [...prev.search.nodes, ...next.search.nodes],
    },
  }
}

const SEARCH = gql`
  query($query: String!, $after: String) {
    search(query: $query, type: ISSUE, first: 10, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on Issue {
          number
          title
          createdAt
          milestone {
            number
            title
          }
          labels(first: 10) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`
// "useHook repo:facebook/react assignee:662"
export default SEARCH
