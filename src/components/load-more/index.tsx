import React from 'react'
import RequestStatus, { RequestStatusProps } from '../request-status'
import Container from '../container'
import Button from '../button'

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
  <RequestStatus loading={loading} error={error} onRefresh={onRefresh}>
    {hasNextPage && (
      <Container size="small" style={{ textAlign: 'center' }}>
        <Button as="div" bordered={false} onClick={loadMore}>
          <div>加载更多</div>
          <div>﹀</div>
        </Button>
      </Container>
    )}
  </RequestStatus>
)

export default LoadMore
