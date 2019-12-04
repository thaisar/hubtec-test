import styled from 'styled-components';

export const Container = styled.div`
    margin-bottom: 10px;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 250px;
    background: #eeeeee;
`

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Title = styled.p`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: #171725;
`

export const Description = styled.p`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #696969;
`

export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
`