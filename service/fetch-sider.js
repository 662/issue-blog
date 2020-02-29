import fetchApi from './fetch-api'
import config from '../config/blog'

const GRAPHQL = `
  query {
    repository(
      name: "${config.github.repository.name}",
      owner: "${config.github.repository.owner}"
    ) {
      milestones(last: 100) {
        nodes {
          title
          number
        }
      }
      labels(last: 100) {
        nodes {
          name
          number
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
export default async function fetchSider() {
  const res = await fetchApi({
    query: GRAPHQL,
  })

  const categories = res?.data.repository.milestones.nodes ?? []
  const tags = res?.data.repository.labels.nodes ?? []
  const posts = res?.data.repository.issues.nodes ?? []

  return {
    categories,
    tags,
    posts,
  }
}
