import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux'
import { Container } from './styles';
import { message } from 'antd';
import LoginForm from './LoginForm';
import { clearError } from '../../redux/actions/user'

const bindConnection = Component => {
    return connect(null, {
        clearError
    })(Component);
}

const Login = (props) => {
    const { error } = useSelector(state => state.user)
    const [state, setState] = useState({

    })
    document.body.className = 'home';

    useEffect(() => {
        if (error) {
            message.error(error)
            props.clearError()
        }
    }, [error])

    return (
        <Container>
            <LoginForm />
        </Container>
    )
}

export default bindConnection(Login)