import React from 'react'
import Section from 'src/components/section'

const Footer: React.FC = () => (
  <Section
    style={{ fontSize: 12, padding: 8, textAlign: 'center', marginTop: 32 }}>
    Copyright © 2019 Lost Scarecrow.
    <a
      href="http://www.beian.miit.gov.cn/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ marginLeft: 16 }}>
      渝ICP备17011776号
    </a>
  </Section>
)

export default Footer
