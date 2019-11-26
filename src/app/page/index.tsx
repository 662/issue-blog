import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import QUERY_POST from '../../graphql/query-post'
import DataPanel from '../../components/data-panel'
import './index.scss'

interface PageProps {
  issueNumber: number
  title: string
}

const Page: React.FC<PageProps> = ({ issueNumber, title }) => {
  const { loading, data, error, refetch } = useQuery(QUERY_POST, {
    variables: { number: issueNumber },
  })
  const issueHTML = data ? data.repository.issue.bodyHTML : ''
  return (
    <DataPanel error={error} loading={loading} onRefresh={refetch}>
      <h2 className="m-page-title">{title}</h2>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: issueHTML }}></div>
    </DataPanel>
  )
}

export default Page
