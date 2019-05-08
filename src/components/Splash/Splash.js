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
    return <div>{this.state.wev.obj}<div>Icons made by <a href="https://www.freepik.com/?__hstc=57440181.24330fd8c5ec6ea1b89590a8109c22c4.1557175034833.1557175034833.1557246701679.2&__hssc=57440181.2.1557246701679&__hsfp=1066321076" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div></div>
  }
}