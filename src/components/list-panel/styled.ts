import styled from 'styled-components'

type ListPanelProps = { direction: 'row' | 'column' }

export const ListPanel = styled.ul<ListPanelProps>`
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
