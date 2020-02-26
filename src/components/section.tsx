import styled from 'styled-components'

type SectionProps = {
  divider?: boolean
}

const Section = styled.section<SectionProps>`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 32px;
  ${props => props.divider && 'border-bottom: solid 1px #ddd'}
`
export default Section
