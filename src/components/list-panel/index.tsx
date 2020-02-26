import React from 'react'
import DataPanel, { DataPanelProps } from '../data-panel'
import * as styled from './styled'

export interface ListPanelProps<T> extends DataPanelProps {
  direction?: 'row' | 'column'
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  itemKey: (item: T) => string
}

function ListPanel<T>({
  icon,
  title,
  ext,
  data,
  renderItem,
  itemKey,
  error,
  loading,
  direction = 'column',
}: ListPanelProps<T>) {
  return (
    <DataPanel
      title={title}
      ext={ext}
      error={error}
      loading={loading}
      icon={icon}>
      <styled.ListPanel direction={direction}>
        {data.map((item, i) => (
          <li key={itemKey(item)}>{renderItem(item, i)}</li>
        ))}
      </styled.ListPanel>
    </DataPanel>
  )
}

export default ListPanel
