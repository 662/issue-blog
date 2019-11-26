import { gql } from 'apollo-boost'
import { IQueryPostsResult } from '../interfaces'
import config from '../configs/blog.json'

export type QueryPostsVariables = {
  after: string | null
  labels: [string] | null
}

export type QueryPostsResult = IQueryPostsResult

export function merge(
  prev: QueryPostsResult,
  next: QueryPostsResult
): QueryPostsResult {
  return {
    repository: {
      ...prev.repository,
      issues: {
        ...prev.repository.issues,
        pageInfo: next.repository.issues.pageInfo,
        nodes: [
          ...prev.repository.issues.nodes,
          ...next.repository.issues.nodes,
        ],
      },
    },
  }
}

const QUERY_POSTS = gql`
  query($after: String, $labels: [String!]) {
    repository(
      name: "${config.github.repository.name}",
      owner: "${config.github.repository.owner}"
    ) {
      issues(
        first: 10
        after: $after
        labels: $labels
        orderBy: { field: CREATED_AT, direction: DESC },
        filterBy: { assignee: "${config.github.repository.assignee}" }
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
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

export default QUERY_POSTS
