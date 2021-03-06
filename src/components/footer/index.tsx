import React from 'react'
import './index.scss'

const Footer: React.FC = () => (
  <section className="m-container m-footer">
    Copyright © 2019 Lost Scarecrow.
    <a
      href="http://www.beian.miit.gov.cn/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ marginLeft: 16 }}>
      渝ICP备17011776号
    </a>
  </section>
)

export default Footer
