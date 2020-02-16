import React from 'react'
import './index.scss'

export interface PanelProps {
  title?: React.ReactNode
  ext?: React.ReactNode
  icon?: string
}

const Panel: React.FC<PanelProps> = ({ title, ext, children, icon }) => (
  <div className="m-panel">
    {(title || ext) && (
      <div className="m-panel-header">
        <div className="m-panel-title">
          {icon && <i className={icon} />}
          {title}
        </div>
        {ext && <div>{ext}</div>}
      </div>
    )}
    <div className="m-panel-body">{children}</div>
  </div>
)

export default Panel
