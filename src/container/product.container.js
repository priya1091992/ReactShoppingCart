import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

import { fetchProducts } from '../actions/product.action'
import Header from './../component/Header/index'
import Footer from './../component/Footer/index'
import Card from './../component/Card/index'
import './style.scss';

const productOptions = {
  'popular': 'Popular',
  'low-price': 'Low Price',
  'high-price': 'High Price',
}

export class ProductDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      option: null,
      inputData: ''
    }
  }

  componentWillMount() {
    const { fetchData } = this.props
    fetchData()
  }

  setOption(e) {
    if (e.target.value == this.state.option) {
      this.setState({
        option: null
      })
    } else {
      this.setState({
        option: e.target.value
      })
    }
  }

  setInputData(e) {
    this.setState({
      inputData: e.target.value
    })
  }

  render() {
    const { product } = this.props
    const { option, inputData } = this.state
    let mainView = null
    if (product) {
      mainView =  <Card listData={product} searchedData={option} inputData={inputData}/>
    }

    const filter = Object.keys(productOptions).map((key, i) => {
     return (
       <span key={i} className="radio-options">
          <input type="radio" checked={option == key}
            onClick={(e) => this.setOption(e)} value={key} />
          <label>{productOptions[key]}</label>
      </span>
     )
    })

    let options = (
      <div className="option">
        {filter}
      </div>
    )

    return (
      <div className="container">
        <Header/>
        <div className="option input-field">
          <input
            type="text"
            onChange={(e) => this.setInputData(e)}
            value={inputData}
            placeholder="Filter data"
          />
          <img className="logo" src={ require("./../actions/images/search.png") } />
        </div>
        {options}
        {mainView}
        <Footer/>
      </div>
    )
  }
}

const bindAction = (dispatch) => ({
    fetchData: () => dispatch(fetchProducts())
});

const mapStateToProps = state => ({
    product: state.ProductReducer.products
});

export default connect(mapStateToProps, bindAction)(ProductDetail);
