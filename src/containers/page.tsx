import React from 'react'
import { useRouteData } from 'react-static'
// import Gitalk from 'gitalk'
// import 'gitalk/dist/gitalk.css'
import Panel from 'components/panel'
import { IPage } from 'types'

const Page: React.FC = () => {
  const { post, title } = useRouteData<IPage>()
  const issueHTML = post.bodyHTML ?? ''
  return (
    <Panel>
      <h2 style={{ margin: '0 0 32px 0' }}>{title}</h2>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: issueHTML }}></div>

      {/* {allowComments && <div ref={commentRef} style={{ marginTop: 64 }}></div>} */}
    </Panel>
  )
}

export default Page
