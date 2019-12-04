import React from 'react';
import { Container } from './styles';

const Column = ({ title, ...restProps }) => (
    <Container 
        {...restProps}>
    </Container>
)

export default Column;