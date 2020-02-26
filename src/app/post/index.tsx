import React, { memo, useCallback } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { RouteComponentProps } from 'react-router-dom'
import Gitalk from 'gitalk'
import QUERY_POST, {
  QueryPostResult as Result,
  QueryPostVariables as Variables,
} from '../../graphql/query-post'
import DataPanel from '../../components/data-panel'
import config from '../../configs/blog.json'
import 'gitalk/dist/gitalk.css'
import * as styled from './styled'

type Params = { id: string }

const Post: React.FC<RouteComponentProps<Params>> = memo(({ match }) => {
  const number = ~~match.params.id

  const { loading, data, error, refetch } = useQuery<Result, Variables>(
    QUERY_POST,
    { variables: { number } }
  )

  const commentRef = useCallback(
    node => {
      if (node !== null) {
        const gitalk = new Gitalk({ ...config.gitalk, number })
        gitalk.render(node)
      }
    },
    [number]
  )

  const post = data?.repository.issue

  return (
    <DataPanel error={error} loading={loading} onRefresh={refetch}>
      {post && (
        <>
          <styled.Header>
            <styled.Title>{post.title}</styled.Title>
            <styled.Profile>
              <styled.ProfileItem>
                {moment(post.createdAt).format('YYYY-MM-DD')}
              </styled.ProfileItem>
              <styled.ProfileLabel>Category:</styled.ProfileLabel>
              <styled.ProfileItem
                as={Link}
                to={`/categories/${post.milestone.number}`}>
                {post.milestone.title}
              </styled.ProfileItem>
            </styled.Profile>
            <styled.Profile>
              <styled.ProfileLabel>Tags:</styled.ProfileLabel>
              {post.labels.nodes.map(label => (
                <styled.ProfileItem
                  as={Link}
                  key={label.name}
                  to={`/tags/${label.name}`}>
                  {label.name}
                </styled.ProfileItem>
              ))}
            </styled.Profile>
          </styled.Header>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{
              __html: post.bodyHTML,
            }}></div>
          <div ref={commentRef} style={{ marginTop: 64 }}></div>
        </>
      )}
    </DataPanel>
  )
})

export default Post
