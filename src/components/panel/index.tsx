import React from 'react'
import * as styled from './styled'

export interface PanelProps {
  title?: React.ReactNode
  ext?: React.ReactNode
  icon?: string
}

const Panel: React.FC<PanelProps> = ({ title, ext, children, icon }) => (
  <styled.Panel>
    {(title || ext) && (
      <styled.PanelHeader>
        <div>
          {icon && <i className={icon} />}
          {title}
        </div>
        {ext && <div>{ext}</div>}
      </styled.PanelHeader>
    )}
    <styled.PanelBody>{children}</styled.PanelBody>
  </styled.Panel>
)

export default Panel
