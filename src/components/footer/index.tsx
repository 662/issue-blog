import React from 'react'
import './index.scss'

const Footer: React.FC = () => (
  <section className="m-container m-footer">
    Copyright © 2019 662.
    <a
      href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action"
      target="_blank"
      rel="noopener noreferrer"
      style={{ marginLeft: 16 }}>
      渝ICP备17011776号-1
    </a>
  </section>
)

export default Footer
