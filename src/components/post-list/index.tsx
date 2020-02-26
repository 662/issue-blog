import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { IIssue } from '../../interfaces'
import Container from '../container'
import * as styled from './styled'

interface PostListProps {
  issues: IIssue[]
  showYear?: boolean
}

interface PostItemProps {
  issue: IIssue
  showYear: boolean
}

const PostItem: React.FC<PostItemProps> = ({ issue, showYear }) => {
  const createDate = moment(issue.createdAt)
  return (
    <Container size="small" style={{ display: 'flex' }}>
      <styled.Left>
        <styled.Day>{createDate.format('MM-DD')}</styled.Day>
        {showYear && <styled.Year>{createDate.format('YYYY')}</styled.Year>}
      </styled.Left>
      <div>
        <styled.Title>
          <Link to={`/posts/${issue.number}`}>{issue.title}</Link>
        </styled.Title>
        <styled.Profile>
          {issue.milestone && (
            <>
              <span>Category: </span>
              <b>
                <Link to={`/categories/${issue.milestone.number}`}>
                  {issue.milestone.title}
                </Link>
              </b>
            </>
          )}
          {issue.labels.nodes.length !== 0 && (
            <>
              <span>Tags: </span>
              {issue.labels.nodes.map(label => (
                <i key={label.name}>
                  <Link to={`/tags/${label.name}`}>{label.name}</Link>
                </i>
              ))}
            </>
          )}
        </styled.Profile>
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
