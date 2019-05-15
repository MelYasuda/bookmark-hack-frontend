import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import TextForm from '../TextForm';
import FormikEffect from './FormikEffect';
import Alert from 'react-s-alert';
import { WithContext as ReactTags } from 'react-tag-input';
import './CreateBookmark.css';

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

const KeyCodes = {
  SPACE: 32
};

const delimiters = [KeyCodes.SPACE];

export default class CreateForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: null,
      titleForm: false,
      tags:[],
      suggestions: [],
      tagError: false
    }
  }

  componentDidMount() {
    this.getTagSuggestions().then(res => {
      this.setState((prevState, props)=>{
        return {
          suggestions:[...res]
        }
      })
    })
  }

  getTagSuggestions = async () => {
    const response = await fetch('/api/tags/suggestionTags', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer' + ' ' + window.sessionStorage.jwtToken
      }
    });

    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }

    return body;
  }

  onHandleChangeTitle = (title) => {
    this.setState({title: title})
  }

  handleTitleForm = () => {
    this.setState({titleForm: true})
  }

  handleCloseButton = () => {
    this.props.onCloseButton()
  }

  handleCreateBookmark = async (values, {resetForm}) => {
    values.tags = this.state.tags;
    if(!values.tags.length){
      this.setState((prev, props)=>{
        return {
          tagError: !prev.tagError
        }
      })
      return null
    }
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

        Alert.success('Bookmark created!', {
          position: 'top',
          effect: 'stackslide',
          timeout: 5000,
          offset:60
      });

        resetForm();
        this.setState({title:null, tags:[], tagError: false})
        this.handleCloseButton();
        return res;
      } else {
        Alert.error('Bookmark creation failed',{
          position:'bottom-left',
          timeout: 9000
        });
        // resetForm for now but should be kept
        resetForm();
        this.setState({title:null, tags:[], tagError: false})
        this.handleCloseButton();
        throw Error(`Request rejected with status ${res.status}`);
      }
    }).catch(console.error)
  }

  handleUrlChange = async (url) => {
    return fetch('/api/bookmarks/preview', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + window.sessionStorage.jwtToken
      },
      body: JSON.stringify({url: url})
    }).then(async res=>{
      const result = await res.json();
      this.onHandleChangeTitle(result.body.title)
      return result.body
    })
  }

  handleAddition = (tag) => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
}

  handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({
    tags: tags.filter((tag, index) => index !== i),
    });
  }

  render() {
    const {tags, suggestions} = this.state;
    return (
      <div>
        <Formik 
          initialValues={{
            url:'', note:'', important: false, title:'',unfinished: false, remind: false
          }}
          onSubmit={this.handleCreateBookmark}
          validationSchema={Yup.object().shape({
            url: Yup.string().required('URL is required'),
            note: Yup.string(),
            important: Yup.bool(),
            unfinished: Yup.bool(),
            remind: Yup.bool(),
            title: Yup.string().required('Title is required'),
          })}
          render={({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
            isSubmitting,
            setFieldValue
          }) =>(
            <Form onSubmit={handleSubmit}>
            <FormikEffect onChange={async (current, next) => {
              if(current.values.url && next.values.url!==current.values.url) {
                await this.handleUrlChange(current.values.url).then(values=>setFieldValue('title',values.title))}
                  }} 
                />
              <div>
                {(()=>{
                  if(this.state.titleForm) {return (
                    <TextForm 
                  title='Title'
                  label='Title'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='title'
                  error={touched.title && errors.title}
                />
                  )} else return <div style={{marginBottom: 30 + 'px'}}>{(()=>{
                    if(this.state.title) return (<span>Title:<br/> <h5 style={{display:'inline'}}>{this.state.title}</h5><span style={{color: 'blue', marginLeft:10+'px',textDecoration: 'underline', cursor:'default'}} onClick={this.handleTitleForm}>Edit</span></span>)
                    })()}</div>
                })()}
                <TextForm 
                  title='URL'
                  label='URL'
                  value={values.url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='url'
                  error={touched.url && errors.url}
                />
                <div>
                  <ReactTags 
                    tags={tags}
                    suggestions={suggestions}
                    handleAddition={this.handleAddition}
                    handleDelete={this.handleDelete}
                    delimiters={delimiters} />
                  {(()=>{if(this.state.tagError)return (<p>At least one tag is required</p>)})()}
                </div>
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
            </Form>
          )}
          />
      </div>
    )
  }
}