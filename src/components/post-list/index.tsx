import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { IIssue } from '../../interfaces'
import './index.scss'

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
    <div className="m-post-item">
      <div className="m-post-item-header">
        {/* {issue.createdAt} */}
        <div className="m-post-item-day">{createDate.format('MM-DD')}</div>
        {showYear && (
          <div className="m-post-item-year">{createDate.format('YYYY')}</div>
        )}
      </div>
      <div className="m-post-item-body">
        <div className="m-post-item-title">
          <Link to={`/posts/${issue.number}`}>{issue.title}</Link>
        </div>
        <div className="m-post-item-profile">
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
        </div>
      </div>
    </div>
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
