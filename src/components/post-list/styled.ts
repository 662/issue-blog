import styled from 'styled-components'

export const Left = styled.div`
  width: 80px;
  margin-right: 16px;
`
export const Day = styled.div`
  text-align: center;
  font-size: 24px;
`

export const Year = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
`

export const Title = styled.div`
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
  font-size: 18px;
`
export const Profile = styled.div`
  margin-top: 14px;
  b,
  i {
    margin-right: 16px;
    font-size: 12px;
  }
`
