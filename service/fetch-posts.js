import fetchApi from './fetch-api'
import config from '../config/blog'

const GRAPHQL = `
  query($query: String!, $after: String) {
    search(query: $query, type: ISSUE, first: 100, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on Issue {
          number
          title
          bodyHTML
          createdAt
          updatedAt
          category: milestone {
            number
            title
          }
          tags: labels(first: 10) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`
export default async function fetchPosts({
  milestone,
  label,
  after = null,
} = {}) {
  let query = `repo:${config.github.repository.owner}/${config.github.repository.name}`
  query += ` assignee:${config.github.repository.assignee}
  `
  if (milestone) query += ` milestone:${milestone}`
  if (label) query += ` label:${label}`

  const res = await fetchApi({
    query: GRAPHQL,
    variables: { query, after },
  })

  return res?.data.search.nodes ?? []
}
