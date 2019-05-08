import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import TextForm from '../TextForm';

const Checkbox = ({
  field: { name, value, onChange },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        className='radio-button'
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};


export default class CreateForm extends Component {

  handleCreateBookmark = async (values) => {
    console.log(values)
    const {tags} = values;
    const tagsArray = tags.split(' ');
    values.tags = tagsArray;
    fetch('/api/bookmarks', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + window.sessionStorage.jwtToken
      },
      body: JSON.stringify(values)
    }).then(res=>{
      if(res.ok) {
        return res;
      } else {
        throw Error(`Request rejected with status ${res.status}`);
      }
    }).catch(console.error)
  }

  render() {
    return (
      <div>
        <Formik 
          initialValues={{
            url:'', tags:'', note:'', important: false, unfinished: false, remind: false
          }}
          onSubmit={this.handleCreateBookmark}
          validationSchema={Yup.object().shape({
            url: Yup.string().required('URL is required'),
            tags: Yup.string().required('At least one tag is required'),
            note: Yup.string(),
            important: Yup.bool(),
            unfinished: Yup.bool(),
            remind: Yup.bool()
          })}
          render={({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
            isSubmitting
          }) =>(
            <form onSubmit={handleSubmit}>
              <div>
                <TextForm 
                  title='URL'
                  label='URL'
                  value={values.url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='url'
                  error={touched.url && errors.url}
                />
                <TextForm 
                  title='Tags'
                  label='Tags'
                  value={values.tags}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='tags'
                  error={touched.tags && errors.tags}
                />
                <TextForm 
                  title='Note'
                  label='Note'
                  value={values.note}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='note'
                  error={touched.note && errors.note}
                />
                <Field
                  component={Checkbox}
                  name='important'
                  id='important'
                  label='important'
                />
                <Field
                  component={Checkbox}
                  name='unfinished'
                  id='unfinished'
                  label='unfinished'
                />
                <Field
                  component={Checkbox}
                  name='remind'
                  id='remind'
                  label='remind'
                />
              </div>
              <button type="button" onClick={this.props.onCloseButton} className='btn btn-primary'>Close</button>
              <button
                type="submit"
                className="btn btn-success"
                >
                Submit
              </button>
            </form>
          )}
          />
      </div>
    )
  }
}