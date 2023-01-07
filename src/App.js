import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import PropTypes from 'prop-types'

export default class App extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  render() {
    return (
      <div>
          <Navbar/>
          <News pageSize={5} country="in" category="science"/>
      </div>
    )
  }
}
