import React from 'react'
import styled from 'styled-components'
import Panel, { PanelProps } from './panel'

export const StyledListPanel = styled.ul<{ direction: 'row' | 'column' }>`
  margin: 0px ${props => (props.direction === 'row' ? -8 : 0)}px;
  padding: 0;
  display: flex;
  flex-direction: ${props => props.direction};
  flex-wrap: wrap;

  li {
    line-height: 1.5;
    margin: 4px ${props => (props.direction === 'row' ? 8 : 0)}px;
    ${props => props.direction === 'row' && 'max-width: 112px;'}
    list-style: none;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
`

export interface ListPanelProps<T> extends PanelProps {
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
  direction = 'column',
}: ListPanelProps<T>) {
  return (
    <Panel title={title} ext={ext} icon={icon}>
      <StyledListPanel direction={direction}>
        {data.map((item, i) => (
          <li key={itemKey(item)}>{renderItem(item, i)}</li>
        ))}
      </StyledListPanel>
    </Panel>
  )
}

export default ListPanel
