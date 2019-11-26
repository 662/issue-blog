import React from 'react'
import DataPanel, { DataPanelProps } from '../data-panel'
import './index.scss'

export interface ListPanelProps<T> extends DataPanelProps {
  direction?: 'row' | 'column'
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  itemKey: (item: T) => string
}

function ListPanel<T>({
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
    <DataPanel title={title} ext={ext} error={error} loading={loading}>
      <ul className={`m-panel-list m-panel-list-${direction}`}>
        {data.map((item, i) => (
          <li key={itemKey(item)}>{renderItem(item, i)}</li>
        ))}
      </ul>
    </DataPanel>
  )
}

export default ListPanel
