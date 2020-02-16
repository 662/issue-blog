import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import ListPanel from '../list-panel'
import RequestStatus from '../request-status'

import { IMilestone, ILabel, IIssue } from '../../interfaces'
import QUERY_SIDER from '../../graphql/query-sider'
import './index.scss'

const Sider: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_SIDER)
  const categories: IMilestone[] = data ? data.repository.milestones.nodes : []
  const tags: ILabel[] = data ? data.repository.labels.nodes : []
  const recentPosts: IIssue[] = data ? data.repository.issues.nodes : []

  return (
    <div className="m-sider">
      <RequestStatus loading={loading} error={error} onRefresh={refetch}>
        <ListPanel
          icon="far fa-folder"
          title="Categories"
          data={categories}
          itemKey={item => item.title}
          renderItem={item => (
            <Link to={`/categories/${item.title}`} title={item.title}>
              {item.title}
            </Link>
          )}
        />
        <ListPanel
          icon="far fa-star"
          title="Tags"
          direction="row"
          data={tags}
          itemKey={item => item.name}
          renderItem={item => (
            <Link to={`/tags/${item.name}`} title={item.name}>
              {item.name}
            </Link>
          )}
        />
        <ListPanel
          icon="far fa-file"
          title="Recent"
          data={recentPosts}
          itemKey={item => item.number}
          renderItem={item => (
            <Link to={`/posts/${item.number}`} title={item.title}>
              {item.title}
            </Link>
          )}
        />
      </RequestStatus>
    </div>
  )
}

export default Sider
