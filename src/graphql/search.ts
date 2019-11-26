import { gql } from 'apollo-boost'

const SEARCH = gql`
    query($query: String!) {
        search(query: $query, type: ISSUE, first: 10) {
            issueCount
            edges {
                cursor
                node {
                    ... on Issue {
                        number
                        title
                        bodyHTML
                        updatedAt
                        createdAt
                    }
                }
            }
        }
    }
`
// "useHook repo:facebook/react"
export default SEARCH
