import { gql } from 'apollo-boost'
import { IQuerySiderResult } from '../interfaces'
import config from '../configs/blog.json'

export type QuerySiderResult = IQuerySiderResult

const QUERY_SIDER = gql`
  {
    repository(
      name: "${config.github.repository.name}",
      owner: "${config.github.repository.owner}"
    ) {
      milestones(last: 100) {
        nodes {
          number
          title
        }
      }
      labels(last: 100) {
        nodes {
          name
        }
      }
      issues(
        first: 5,
        orderBy: { field: CREATED_AT, direction: DESC },
        filterBy: { assignee: "${config.github.repository.assignee}" }
      ) {
        nodes {
          number
          title
        }
      }
    }
  }
`

export default QUERY_SIDER
