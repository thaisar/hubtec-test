import React from 'react';
import Routes from './routes';
import withStoreProvider from './redux/withStoreProvider';
import 'antd/dist/antd.css';
import './App.css'

function App() {


  return (
    <Routes/>
  );
}

export default withStoreProvider(App);