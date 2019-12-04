import styled from 'styled-components';
import { Button } from 'antd';

export const Container = styled.div`
    padding: 10px;
    padding-left: 50px;
    padding-top: 70px;
    display: flex;
`

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Title = styled.p`
    padding-top: 15px;
    /* padding-left: 15px; */
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.1px;
    color: white;
`

export const ModalFormContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const InputContainer = styled.div`
    /* padding-left: 50px;
    padding-right: 50px; */
    margin-bottom: 10px;
`

export const AddButton = styled(Button)`
    /* position: fixed; */
    top: 10px;
    /* right: 10px; */
`

export const FloatButton = styled(Button)`
    position: absolute;
    top: 30px;
    left: 30px; 
    color: white;
`

export const Background = styled.div`
    background: #000 url('./assets/dashboard.jpg') no-repeat;
`