import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux'
import { navigate } from '@reach/router';

import { Button, Input, Form, Icon } from 'antd';
import { FormContainer, Title, InputContainer, LoginButton, Text, TextLink } from './styles';
import { authenticate } from '../../../redux/actions/user';

const bindConnection = Component => {
    return connect(null, {
        authenticate
    })(Component);
}

const LoginFields = (props) => {

    const { isAuthenticated, authenticating } = useSelector(state => state.user)

    const [state, setState] = useState({
        email: 'tony@email.com1',
        password: '12345678'
    });

    useEffect(()=>{
        if(isAuthenticated)
            navigate("/dashboard")
    }, [isAuthenticated])

    const onChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const { getFieldDecorator } = props.form;

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.authenticate(state)
                // navigate('/visualizar');
            }
        });
    };

    return (
        <FormContainer>

            <Title> Start to organize your tasks ! </Title>

            <Form onSubmit={handleSubmit}>
                <InputContainer>
                    <Form.Item>
                        {getFieldDecorator('E-mail', {
                            initialValue: state.email,
                            setFieldsValue: state.email,
                            rules: [{ required: true, message: 'Please input your e-mail!' }],
                        })(
                            <Input
                                prefix={<Icon type='mail'
                                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder='E-mail'
                                onChange={onChange}
                                name='email'
                            />,
                        )}
                    </Form.Item>
                </InputContainer>

                <InputContainer>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            initialValue: state.password,
                            setFieldsValue: state.password,
                            rules: [{ required: true, message: 'Please input your password!' }],
                        })(
                            <Input.Password
                                prefix={<Icon type='lock' style={{
                                    color: 'rgba(0,0,0,.25)'
                                }} />}
                                placeholder='Password'
                                onChange={onChange}
                                name='password'
                            />,
                        )}
                    </Form.Item>
                </InputContainer>

                <InputContainer>
                    <LoginButton
                        type='primary'
                        htmlType='submit'
                        loading={authenticating}
                    >
                        Login
                    </LoginButton>

                    <Text>New in here? <TextLink onClick={() => navigate("/register")}> Sign Up! </TextLink> </Text>

                </InputContainer>
            </Form>

        </FormContainer>
    )
}

const LoginForm = Form.create()(LoginFields);

export default bindConnection(LoginForm);