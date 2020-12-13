//공통적용 페이지
import React from 'react';
import Head from 'next/head';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import wrapper from '../store/configureStore';

const NodeBird = ({ Component }) =>{
return (
    <>
    <Head>
        <title>NodeBird</title>
    </Head>
    <Component/>
    </>
);
};

NodeBird.propTypes = {
    Component : PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(NodeBird);