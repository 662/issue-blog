import React, { useCallback } from 'react'
import Gitalk from 'gitalk'
import { useQuery } from '@apollo/react-hooks'
import QUERY_POST from 'src/graphql/query-post'
import DataPanel from '../../components/data-panel'
import config from '../../configs/blog.json'
import 'gitalk/dist/gitalk.css'

interface PageProps {
  issueNumber: number
  title: string
  allowComments: boolean
}

const Page: React.FC<PageProps> = ({ issueNumber, title, allowComments }) => {
  const { loading, data, error, refetch } = useQuery(QUERY_POST, {
    variables: { number: issueNumber },
  })

  const issueHTML = data ? data.repository.issue.bodyHTML : ''

  const commentRef = useCallback(
    node => {
      if (node !== null) {
        const gitalk = new Gitalk({ ...config.gitalk, number: issueNumber })
        gitalk.render(node)
      }
    },
    [issueNumber]
  )

  return (
    <DataPanel error={error} loading={loading} onRefresh={refetch}>
      <h2 style={{ margin: '0 0 32px 0' }}>{title}</h2>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: issueHTML }}></div>

      {allowComments && <div ref={commentRef} style={{ marginTop: 64 }}></div>}
    </DataPanel>
  )
}

export default Page
