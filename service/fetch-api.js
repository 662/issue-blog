import fetch from 'node-fetch'
import config from '../config/blog'

export default function fetchApi({ query, variables }) {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${config.github.token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  }).then(r => r.json())
}
