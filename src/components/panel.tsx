import React from 'react'
import styled from 'styled-components'

export const StyledPanelHeader = styled.div`
  padding: 8px;
  display: flex;
  border-bottom: solid 1px #ddd;
  font-size: 16px;
  i {
    margin-right: 4px;
  }
`

export const StyledPanelBody = styled.div`
  padding: 8px;
  font-size: 14px;
`
export const StyledPanel = styled.div`
  margin-bottom: 16px;
`

export interface PanelProps {
  title?: React.ReactNode
  ext?: React.ReactNode
  icon?: string
}

const Panel: React.FC<PanelProps> = ({ title, ext, children, icon }) => (
  <StyledPanel>
    {(title || ext) && (
      <StyledPanelHeader>
        <div>
          {icon && <i className={icon} />}
          {title}
        </div>
        {ext && <div>{ext}</div>}
      </StyledPanelHeader>
    )}
    <StyledPanelBody>{children}</StyledPanelBody>
  </StyledPanel>
)

export default Panel
