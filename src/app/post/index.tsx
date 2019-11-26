import React, { memo, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { RouteComponentProps } from 'react-router-dom'
import QUERY_POST from '../../graphql/query-post'
import DataPanel from '../../components/data-panel'

type Params = { id: string }

const Post: React.FC<RouteComponentProps<Params>> = memo(({ match }) => {
  const number = ~~match.params.id

  const { loading, data, error, refetch } = useQuery(QUERY_POST, {
    variables: { number },
  })

  const refreshHandler = useCallback(() => refetch(), [refetch])

  return (
    <DataPanel error={error} loading={loading} onRefresh={refreshHandler}>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{
          __html: data && data.repository.issue.bodyHTML,
        }}></div>
    </DataPanel>
  )
})

export default Post
