import { gql } from 'apollo-boost'
import { IQueryPostResult } from '../interfaces'
import config from '../configs/m-blog.json'

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
            }
        }
    }
`

export default QUERY_POST
