import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux'
import { navigate } from '@reach/router';
import { Button, Input, Form, Icon, message } from 'antd';
import { Container, Title, FormContainer, InputContainer, RegisterButton, Text, TextLink } from './styles';
import { authenticate, register, clearError } from '../../redux/actions/user';

const bindConnection = Component => {
    return connect(null, {
        authenticate,
        register,
        clearError
    })(Component);
}

const RegisterField = (props) => {

    document.body.className = 'home';

    const { isCreating, isCreated, isAuthenticated } = useSelector(state => state.user)
    const { error } = useSelector(state => state.user);

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        confirmDirty: ''
    })

    useEffect(() => {
        console.error(error)
        if (error){
            message.error(error)
            props.clearError()
        }
    }, [error])

    useEffect(() => {
        if (isCreated && !isAuthenticated) {
            props.authenticate({ email: state.email, password: state.password })
        } else if (isAuthenticated) {
            navigate("/dashboard")
        }
    }, [isCreated, isAuthenticated])

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
                props.register(state)
                // navigate('/visualizar');
            }
        });
    };

    const compareToFirstPassword = (rule, value, callback) => {
        const { form } = props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    const validateToNextPassword = (rule, value, callback) => {
        const { form } = props;
        if (value && state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    return (

        <Container>
            <FormContainer>

                <Title> Register </Title>

                <Form onSubmit={handleSubmit}>

                    <InputContainer>
                        <Form.Item >
                            {getFieldDecorator('name', {
                                initialValue: state.name,
                                setFieldsValue: state.name,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your name!'
                                    }
                                ],
                            })(<Input
                                placeholder='Name'
                                onChange={onChange}
                                name='name'
                            />)}
                        </Form.Item>
                    </InputContainer>

                    <InputContainer>
                        <Form.Item >
                            {getFieldDecorator('E-mail', {
                                initialValue: state.email,
                                setFieldsValue: state.email,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your e-mail!'
                                    }
                                ],
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
                        <Form.Item >
                            {getFieldDecorator('password', {
                                initialValue: state.password,
                                setFieldsValue: state.password,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    },
                                    {
                                        validator: validateToNextPassword,
                                    },
                                ],
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
                        <Form.Item >
                            {getFieldDecorator('passwordConfirmation', {
                                initialValue: state.passwordConfirmation,
                                setFieldsValue: state.passwordConfirmation,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password confirmation!'
                                    },
                                    {
                                        validator: compareToFirstPassword,
                                    },
                                ],
                            })(
                                <Input.Password
                                    prefix={<Icon type='lock' style={{
                                        color: 'rgba(0,0,0,.25)'
                                    }} />}
                                    placeholder='Password Confirmation'
                                    onChange={onChange}
                                    name='passwordConfirmation'
                                />,
                            )}
                        </Form.Item>
                    </InputContainer>


                    <InputContainer>
                        <RegisterButton loading={isCreating} type='primary' htmlType='submit'>
                            Register
                        </RegisterButton>
                    </InputContainer>
                    <Text>New in here? <TextLink onClick={() => navigate("/")}> Sign in! </TextLink> </Text>

                </Form>

            </FormContainer>
        </Container>
    )
}

const RegisterForm = Form.create()(RegisterField);

export default bindConnection(RegisterForm);