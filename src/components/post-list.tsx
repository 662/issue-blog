import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Link } from '@reach/router'
import { IPost } from 'types'
import Container from './container'

export const StyledLeft = styled.div`
  width: 80px;
  margin-right: 16px;
`
export const StyledDay = styled.div`
  text-align: center;
  font-size: 24px;
`

export const StyledYear = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
`

export const StyledTitle = styled.div`
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
  font-size: 18px;
`
export const StyledProfile = styled.div`
  margin-top: 14px;
  b,
  i {
    margin-right: 16px;
    font-size: 12px;
  }
`

interface PostListProps {
  issues: IPost[]
  showYear?: boolean
}

interface PostItemProps {
  issue: IPost
  showYear: boolean
}

const PostItem: React.FC<PostItemProps> = ({ issue, showYear }) => {
  const createDate = moment(issue.createdAt)
  return (
    <Container size="small" style={{ display: 'flex' }}>
      <StyledLeft>
        <StyledDay>{createDate.format('MM-DD')}</StyledDay>
        {showYear && <StyledYear>{createDate.format('YYYY')}</StyledYear>}
      </StyledLeft>
      <div>
        <StyledTitle>
          <Link to={`/post/${issue.number}`}>{issue.title}</Link>
        </StyledTitle>
        <StyledProfile>
          {issue.category && (
            <>
              <span>Category: </span>
              <b>
                <Link to={`/categories/${issue.category.number}`}>
                  {issue.category.title}
                </Link>
              </b>
            </>
          )}
          {issue.tags.nodes.length !== 0 && (
            <>
              <span>Tags: </span>
              {issue.tags.nodes.map(tag => (
                <i key={tag.name}>
                  <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
                </i>
              ))}
            </>
          )}
        </StyledProfile>
      </div>
    </Container>
  )
}

const PostList: React.FC<PostListProps> = ({ issues, showYear = true }) => {
  return (
    <ul className="m-post-list">
      {issues.map(issue => (
        <li key={issue.number}>
          <PostItem issue={issue} showYear={showYear}></PostItem>
        </li>
      ))}
    </ul>
  )
}

export default PostList
