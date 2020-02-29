import React from 'react'
import Section from './section'

const Footer: React.FC = () => (
  <Section
    style={{ fontSize: 12, padding: 8, textAlign: 'center', marginTop: 32 }}>
    Copyright © 2019 baiyezi.com
    <a
      href="http://www.beian.miit.gov.cn/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ marginLeft: 16 }}>
      渝ICP备17011776号-1
    </a>
  </Section>
)

export default Footer
