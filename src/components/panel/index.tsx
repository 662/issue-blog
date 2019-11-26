import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import './index.scss'

export interface PanelProps {
  title?: React.ReactNode
  ext?: React.ReactNode
  icon?: IconProp
}

const Panel: React.FC<PanelProps> = ({ title, ext, children, icon }) => (
  <div className="m-panel">
    {(title || ext) && (
      <div className="m-panel-header">
        <div className="m-panel-title">
          {icon && <FontAwesomeIcon icon={icon} />}
          {title}
        </div>
        {ext && <div>{ext}</div>}
      </div>
    )}
    <div className="m-panel-body">{children}</div>
  </div>
)

export default Panel
