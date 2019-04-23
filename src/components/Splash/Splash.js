import React, { Component } from 'react';

export class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      wev: null
    }
  }

  componentDidMount() {
    this.callBackendAPI().then((res)=> {
      this.setState((prevState, props)=>{
        return { wev: res, isLoading: !prevState.isLoading}
      })
    }).catch(error => console.log(error))
  }

  callBackendAPI = async () => {
    const response = await fetch('/api/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }

  render() {
    if(this.state.isLoading) return null;
    return <div>{this.state.wev.obj}</div>
  }
}