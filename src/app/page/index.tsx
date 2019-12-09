import React, { useCallback } from 'react'
import Gitalk from 'gitalk'
import { useQuery } from '@apollo/react-hooks'
import QUERY_POST from 'src/graphql/query-post'
import DataPanel from '../../components/data-panel'
import 'gitalk/dist/gitalk.css'
import './index.scss'

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
        const gitalk = new Gitalk({
          clientID: 'a9ea8ec21008341ab6f8',
          clientSecret: '6656888d4258b947370b8b27b7650baa4e97fca2',
          repo: 'blog',
          owner: '662',
          admin: ['662'],
          number: issueNumber,
          distractionFreeMode: false,
        })
        gitalk.render(node)
      }
    },
    [issueNumber]
  )

  return (
    <DataPanel error={error} loading={loading} onRefresh={refetch}>
      <h2 className="m-page-title">{title}</h2>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: issueHTML }}></div>

      {allowComments && (
        <div ref={commentRef} className="m-page-comments"></div>
      )}
    </DataPanel>
  )
}

export default Page
