import { gql } from 'apollo-boost'
import { IQueryPostResult } from '../interfaces'
import config from '../configs/blog.json'

export type QueryPostVariables = {
  number: number
}

export type QueryPostResult = IQueryPostResult

const QUERY_POST = gql`
    query($number: Int!) {
        repository(name: "${config.github.repository.name}", owner: "${config.github.repository.owner}") {
            issue(number: $number) {
                title
                bodyHTML
                createdAt
                updatedAt
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
`

export default QUERY_POST
