import fetchApi from './fetch-api'
import config from '../config/blog'

const GRAPHQL = `
  query($number: Int!) {
    repository(
      name: "${config.github.repository.name}",
      owner: "${config.github.repository.owner}"
    ) {
        issue(number: $number) {
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
`
export default async function fetchPost({ number }) {
  const res = await fetchApi({
    query: GRAPHQL,
    variables: { number },
  })

  return res?.data.repository.issue ?? {}
}
