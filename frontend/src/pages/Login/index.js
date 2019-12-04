import React, {useEffect, useState} from 'react';
import {useSelector } from 'react-redux';
import { Container } from './styles';
import { message } from 'antd';
import LoginForm from './LoginForm';

const Login = (props) => {
    const { error } = useSelector(state => state.user)
    const [ state, setState ] = useState({
        
    })
    document.body.className = 'home';

    useEffect(() => {
        if(error)
            message.error(error)
    }, [error])

    return (
        <Container>
           <LoginForm/>
        </Container>
    )
}

export default Login