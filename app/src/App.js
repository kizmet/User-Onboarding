import React, {useState} from "react";
import "./App.css";
import { Layout } from "antd";
import { Formik } from 'formik';
import * as Yup from 'yup';
import MyForm from './MyForm';
import { render } from 'react-dom';
import { withFormik } from 'formik';
import Register from './register'

function App() {
  const { Header, Footer, Sider, Content } = Layout;
  return (
    <div>
      <Layout>
        <Header>New User Registration</Header>
        <Content>
        <Register Footer={Footer} />
        </Content>
        
      </Layout>
    </div>
  );
}

export default App;

