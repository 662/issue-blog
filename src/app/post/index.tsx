import React, { memo, useEffect } from 'react'
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
import './index.scss'
import 'gitalk/dist/gitalk.css'

type Params = { id: string }

const Post: React.FC<RouteComponentProps<Params>> = memo(({ match }) => {
  const number = ~~match.params.id
  const { loading, data, error, refetch } = useQuery<Result, Variables>(
    QUERY_POST,
    { variables: { number } }
  )

  useEffect(() => {
    const gitalk = new Gitalk({
      clientID: 'GitHub Application Client ID',
      clientSecret: 'GitHub Application Client Secret',
      repo: 'GitHub repo',
      owner: 'GitHub repo owner',
      admin: [
        'GitHub repo owner and collaborators, only these guys can initialize github issues',
      ],
      number,
      distractionFreeMode: false, // Facebook-like distraction free mode
    })

    gitalk.render('m-comments-list')
  }, [number])

  const post = data?.repository.issue

  return (
    <DataPanel error={error} loading={loading} onRefresh={refetch}>
      {post && (
        <>
          <div className="m-post-header">
            <h2 className="m-post-title">{post.title}</h2>
            <div className="m-post-profile">
              <span className="m-post-profile-item">
                {moment(post.createdAt).format('YYYY-MM-DD')}
              </span>
              <span className="m-post-profile-title">Category:</span>
              <Link
                className="m-post-profile-item"
                to={`/categories/${post.milestone.number}`}>
                {post.milestone.title}
              </Link>
            </div>
            <div className="m-post-profile">
              <span className="m-post-profile-title">Tags:</span>
              {post.labels.nodes.map(label => (
                <Link
                  className="m-post-profile-item"
                  to={`/tags/${label.name}`}>
                  {label.name}
                </Link>
              ))}
            </div>
          </div>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{
              __html: post.bodyHTML,
            }}></div>
          <div id="m-comments-list"></div>
        </>
      )}
    </DataPanel>
  )
})

export default Post
