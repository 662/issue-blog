import React from 'react'
import Panel, { PanelProps } from '../panel'
import RequestStatus, { RequestStatusProps } from '../request-status'

export type DataPanelProps = PanelProps & RequestStatusProps

const DataPanel: React.FC<DataPanelProps> = ({
  children,
  title,
  ext,
  loading,
  error,
  onRefresh,
  icon,
}) => {
  return (
    <Panel title={title} ext={ext} icon={icon}>
      <RequestStatus loading={loading} error={error} onRefresh={onRefresh}>
        {children}
      </RequestStatus>
    </Panel>
  )
}

export default DataPanel
