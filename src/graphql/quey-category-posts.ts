import { gql } from 'apollo-boost'
import { IQueryCategoryPostsResult } from '../interfaces'
import config from '../configs/m-blog.json'

export type QueryCategoryPostsVariables = {
  after: string | null
  number: number
}

export type QueryCategoryPostsResult = IQueryCategoryPostsResult

export function merge(
  prev: QueryCategoryPostsResult,
  next: QueryCategoryPostsResult
): QueryCategoryPostsResult {
  return {
    repository: {
      ...prev.repository,
      milestone: {
        ...prev.repository.milestone,
        issues: {
          ...prev.repository.milestone.issues,
          pageInfo: next.repository.milestone.issues.pageInfo,
          nodes: [
            ...prev.repository.milestone.issues.nodes,
            ...next.repository.milestone.issues.nodes,
          ],
        },
      },
    },
  }
}

const QUERY_CATEGORY_POSTS = gql`
  query($after: String, $number: Int!) {
    repository(name: "${config.github.repository.name}", owner: "${config.github.repository.owner}") {
      milestone(number: $number) {
        issues(
          first: 10
          after: $after
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
  }
`

export default QUERY_CATEGORY_POSTS
