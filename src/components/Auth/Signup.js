import React, { Component } from 'react';
import './Auth.css';
import TextForm from '../TextForm';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default class Signup extends Component {

  handleSignin = (values, {resetForm}) => {
    const {name, email, password} = values;

        fetch('/api/users',{
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name:name, email: email, password: password})
        }).then((response) => {
          return response.json();
        }).then((response)=> {
        window.sessionStorage.setItem("jwtToken", response.token)}).then(()=> {
          this.props.history.push("/welcome")
        })
        .then(() => this.props.loginCheckAuthenticated())
        .catch((err)=> console.log(err))
  }

  render() {
    return (
      <div className="Auth">
        <div className='form-border'>
          <h2>Sign In</h2>
          <Formik 
            initialValues={{ name: '', email: '', password: '' }}
            onSubmit={this.handleSignin}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Username is required'),
              email: Yup.string().required('Email address is required'),
              password: Yup.string().required('Password needs to be provided')
            })}
            render={({
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              errors,
              touched
              }) => (
                <form onSubmit={handleSubmit}>
                <TextForm
                    label='Username'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoCapitalize="none"
                    name='name'
                    error={touched.name && errors.name}
                    />
                  <TextForm
                    label='Email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoCapitalize="none"
                    name='email'
                    error={touched.email && errors.email}
                    />
                  <TextForm
                    label='Password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoCapitalize="none"
                    name='password'
                    error={touched.password && errors.password}
                    />
                  <div id='signin-btn-group'>
                  Do you have an account?
                  <button
                  type="submit"
                  href=""
                  className="btn btn-primary"
                  >Sing In</button>
                  </div>
                </form>
              )}
            />
            {/* <div id='fb-btn-group'>
              Or sign in with
              <img className='facebook-login' src={facebook} onClick={()=>this.handleFacebookSignIn()} />
            </div> */}
          </div>
      </div>
    );
  }
}