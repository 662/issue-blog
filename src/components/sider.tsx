import React from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'
import { ICategory, ITag, IPost } from 'types'
import ListPanel from './list-panel'

const StyledSider = styled.div`
  width: 256px;
  padding-left: 32px;
  border-left: solid 1px #ddd;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export interface SiderProps {
  categories?: ICategory[]
  tags?: ITag[]
  posts?: IPost[]
}

const Sider: React.FC<SiderProps> = ({
  categories = [],
  tags = [],
  posts = [],
}) => {
  return (
    <StyledSider>
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
        data={posts}
        itemKey={item => item.number}
        renderItem={item => (
          <Link to={`/post/${item.number}`} title={item.title}>
            {item.title}
          </Link>
        )}
      />
    </StyledSider>
  )
}

export default Sider
