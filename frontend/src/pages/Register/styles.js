import styled from 'styled-components';
import { Button } from 'antd';

export const Container = styled.div`
 height: 100vh;
 width: 100%;
 padding-top: 160px;
`

export const FormContainer = styled.div`
 width: 400px;
 border-radius: 20px;
 border: 1px solid #f3f3f3;
 display: flex;
 flex-direction: column;
 margin-left: auto;
 margin-right: auto;
 padding-top: 30px;
 padding-bottom: 20px;
 background-color: white;   
`

export const Title = styled.p`
text-align: center;
font-size: 26px;
`

export const InputContainer = styled.div`
padding-left: 50px;
padding-right: 50px;
`

export const RegisterButton = styled(Button)`
width: 100% !important;
background: #484e4f !important;
color: white !important;
border: 1px solid #f3f3f3 !important;
`


export const Text = styled.p`
text-align: center;
padding-top: 15px;
`

export const TextLink = styled.a`
text-align: center;
padding-top: 15px;
text-decoration: underline;
color: #484e4f;
`