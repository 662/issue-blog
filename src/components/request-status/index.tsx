import React, { memo } from 'react'
import { ApolloError } from 'apollo-client/errors/ApolloError'

export interface RequestStatusProps {
  loading?: boolean
  error?: ApolloError | undefined
  onRefresh?: () => void
}

const RequestStatus: React.FC<RequestStatusProps> = memo(
  ({ loading = false, error = null, onRefresh, children }) => {
    if (loading) return <span>loading...</span>
    if (error)
      return (
        <span>
          fetch error.
          {onRefresh && (
            <i onClick={onRefresh} style={{ cursor: 'pointer' }}>
              refresh
            </i>
          )}
        </span>
      )
    return <>{children}</>
  }
)

export default RequestStatus
