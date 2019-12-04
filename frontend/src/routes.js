import React from 'react';
import { Router } from '@reach/router';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';


export default function Routes() {
    return (
        <Router>
            <Login path='/' />
            <Dashboard path='/dashboard' />
            <Register path='/register' />
        </Router>
    );
}