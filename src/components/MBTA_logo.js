import React, { Component } from 'react';

export default class MBTALogo extends Component {
  constructor(props){
    super(props);
    this.state = {
      line: props.line || null,
      logoColor: "#000"
    }
  }

  componentWillReceiveProps(nextProps){
    let lineColors = {
      Red: '#FA2D27',
      Orange: '#FD8A03',
      Green: '#11773C',
      'Green-B': '#008150',
      'Green-C': '#008150',
      'Green-D': '#008150',
      'Green-E': '#008150',
      Blue: '#2F5DA6',
      Silver: '#9A9C9D',
      Rail: '#B60EA0',
      Boats: '#0066FF',
      Select_A_Line: '#000'
    }
    this.setState({line: nextProps.line, logoColor: lineColors[nextProps.line]})
  }

  // hmmm this isn't working very well.
  // not responsive. or good looking.
  render () {
    console.log(this.state.logoColor)
    return(
      <React.Fragment>
      <div className = "logo">
        <svg viewBox="-50 0 600 500" width="100%" height="100%">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0"  >
            <circle cx="250" cy="250" r="239" stroke={`${this.state.logoColor}`} strokeWidth="22" fill="#fff"/>
            <path d="M92,138.5h316v79.5h-118.25v194h-79.5v-194h-118.25z" fill= {`${this.state.logoColor}`}/>
          </svg>
        </svg>
        </div>
      </React.Fragment>
    )
  }
}
