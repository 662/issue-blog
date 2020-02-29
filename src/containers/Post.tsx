import React from 'react'
import styled from 'styled-components'
import { useRouteData } from 'react-static'
import moment from 'moment'
import { Link } from '@reach/router'
import Panel from 'components/panel'
import { IPost } from 'types'
// import Gitalk from 'gitalk'
// import 'gitalk/dist/gitalk.css'
import 'github-markdown-css'

export const StyledHeader = styled.div`
  margin: 0 0 32px 0;
`

export const StyledProfile = styled.div`
  display: flex;
  padding: 4px 0;
`

export const StyledTitle = styled.h2`
  margin: 8px 0;
`

export const StyledProfileLabel = styled.div`
  margin-right: 8px;
`

export const StyledProfileItem = styled.span`
  margin-right: 16px;
`

const Post: React.FC = () => {
  const { post }: { post: IPost } = useRouteData()

  // const commentRef = useCallback(
  //   node => {
  //     if (node !== null) {
  //       const gitalk = new Gitalk({ ...config.gitalk, number })
  //       gitalk.render(node)
  //     }
  //   },
  //   [number]
  // )

  return (
    <Panel>
      {post && (
        <>
          <StyledHeader>
            <StyledTitle>{post.title}</StyledTitle>
            <StyledProfile>
              <StyledProfileItem>
                {moment(post.createdAt).format('YYYY-MM-DD')}
              </StyledProfileItem>
              <StyledProfileLabel>Category:</StyledProfileLabel>
              <StyledProfileItem
                as={Link}
                to={`/categories/${post.category.number}`}>
                {post.category.title}
              </StyledProfileItem>
            </StyledProfile>
            <StyledProfile>
              <StyledProfileLabel>Tags:</StyledProfileLabel>
              {post.tags.nodes.map(tag => (
                <StyledProfileItem
                  as={Link}
                  key={tag.name}
                  to={`/tags/${tag.name}`}>
                  {tag.name}
                </StyledProfileItem>
              ))}
            </StyledProfile>
          </StyledHeader>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{
              __html: post.bodyHTML,
            }}></div>
          {/* <div ref={commentRef} style={{ marginTop: 64 }}></div> */}
        </>
      )}
    </Panel>
  )
}

export default Post
