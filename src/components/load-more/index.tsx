import React from 'react'
import RequestStatus, { RequestStatusProps } from '../request-status'
import './index.scss'

interface Props extends RequestStatusProps {
  loadMore: () => void
  hasNextPage: boolean
}

const LoadMore: React.FC<Props> = ({
  loading,
  error,
  hasNextPage,
  loadMore,
  onRefresh,
}) => (
  <div className="m-list-end">
    <RequestStatus loading={loading} error={error} onRefresh={onRefresh}>
      {hasNextPage && (
        <div className="m-load-more" onClick={loadMore}>
          <div>加载更多</div>
          <div>﹀</div>
        </div>
      )}
    </RequestStatus>
  </div>
)

export default LoadMore
