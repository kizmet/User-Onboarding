import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik, Formik } from "formik";
import * as Yup from "yup";
import {
  Form as AntFrom,
  List,
  Input,
  Icon,
  Radio,
  Select,
  Checkbox,
  Button,
  DatePicker
} from "antd";

const RegisterForm = ({
  errors,
  touched,
  values,
  handleSubmit,
  handleChange,
  status,
  Footer,
  setFieldValue,
  setFieldTouched,
  name  
}) => {
  const [user, setUser] = useState([]);



  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [status]);

  return (

        <AntFrom onSubmit={handleSubmit} layout="inline">
        <div className="container">
        <div className="component-container">
<label htmlFor="username">Username</label>
            <Field
              placeholder="username"
              label="username"
              name="username"
              id="username"
              type="username"
              width="1"
            />
<label htmlFor="password">Password</label>            
            <Field
              placeholder="Password"
              label="password"
              name="password"
              id="password"
              type="password"
              width="4"
            />
        <label htmlFor="firstName">First Name</label>
            <Field
              placeholder="First Name"
              label="firstName"
              name="firstName"
              id="firstName"
              type="text"
              width="4"
            />
<label htmlFor="lastName">Last Name</label>
            <Field
              placeholder="Last Name"
              label="lastName"
              name="lastName"
              id="lastName"
              type="text"
              width="4"
            />
<label htmlFor="email">Email</label>            
            <Field
              placeholder="Email"
              label="email"
              name="email"
              id="email"
              type="email"
              width="4"
            />              
          <Field
            checked={values.acceptedTerms}
            name="acceptedTerms"
            id="acceptedTerms"
            onChange={handleChange}
            render={props => (<Checkbox onChange={props.handleChange}/>)}
            
            
          >I Accept the Terms </Field>

          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Submit
          </Button>


          <List>
            {user.map(user => (
              <List.Item key={user.username}>
              <List.Item.Meta
              title={user.username}
              description={user.firstName}

              />{user.email}{user.acceptedTerms.toString()}
              </List.Item>
            ))}
            </List>
          </div>
          </div>
        </AntFrom>
 
  );
};

const Register = withFormik({
  mapPropsToValues({
    acceptedTerms,
    username,
    password,
    firstName,
    lastName,
    email
  }) {
    return {
      acceptedTerms: acceptedTerms || false,
      username: username || "username",
      password: password || "password",
      firstName: firstName || "firstName",
      lastName: lastName || "lastName",
      email: email || "email@mail.com"
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .max(16, "Your username must be less than 16 characters")
      .min(5, "Your name must be at least five characters long")
      .required("A name is required"),
    password: Yup.string()
      .min(6, "Your password must have a minimum of six characters.")
      .required("Password is required"),
    firstName: Yup.string()
      .min(2, "Your name must be at least two characters long.")
      .max(30, "Your name must be less than 30 characters.")
      .required("Your first name is required"),
    lastName: Yup.string()
      .min(2, "Your name must be at least two characters long.")
      .max(30, "Your name must be less than 30 characters.")
      .required("Your last name is required"),
    email: Yup.string()
      .min(2, "Your email must be at least two characters long.")
      .max(30, "Your email must be less than 30 characters.")
      .required("Your email is required")
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
        console.log(res);
      })
      .catch(err => console.log(err.response));
  },



})(RegisterForm); // currying functions in Javascript

export default Register;
