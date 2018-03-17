import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import PropTypes from 'prop-types';

import { fetchProducts, setSelectedProduct } from '../actions/product.action'
import Header from './../component/Header/index'
import Footer from './../component/Footer/index'
import Card from './../component/Card/index'
import './style.scss';

/**
 * Initialize constant with objects.
 * to filter data on this basis
 */
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

  /**
  * Initialize a setOption function
  * to assign filter option in 'option' state.
  */
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

  /**
  * Initialize a setInputData function
  * to assign input text field in inputData state.
  */
  setInputData(e) {
    this.setState({
      inputData: e.target.value
    })
    e.preventDefault();
  }

  /**
  * Initialize a inputHandler for autocomplete function
  * to clear input text field in inputData state.
  * and dispatch one action setInputProduct.
  */
  inputHandler(data) {
    const { inputData } = this.state;
    const { setInputProduct } = this.props;
    this.setState({
      inputData: ''
    })
    setInputProduct([data]);
  }

  /**
  * Initialize a autocomplete function
  * to provide correct data for autosuggestion
  */
  autocomplete() {
    const { inputData } = this.state;
    const { product, allProducts } = this.props;
    let autoCompleteDiv = null;
    if (allProducts) {
     autoCompleteDiv = inputData && allProducts.map((data, i) => {
        if (data['itemTitle'].substr(0, inputData.length).toLowerCase() == inputData.toLowerCase()) {
          return (<li key={i} onClick={() => this.inputHandler(data)}>{data['itemTitle']}</li>)
        }
      })
    }
    return autoCompleteDiv
  }

  render() {
    const { product, allProducts, setInputProduct } = this.props
    const { option, inputData } = this.state
    let mainView = null

    /**
    * Card cmponent is to diaplsy products
    * searchData is the filter option using radio button
    * for searching products, inputData is the prop
    */
    if (product) {
      mainView =  <Card listData={product} searchedData={option} inputData={inputData}/>
    }

    //for filtering data on the basis of the 'Low Price', 'High Price' and 'Ratings'
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


    //For autocompletion feature in input text field for searching products
    const autoCompleteItem = inputData ? (
      <div className="autocomplete">
        <ul className="autocomplete-items">
          {this.autocomplete()}
        </ul>
      </div>
    ) : null


    //return function for render()
    return (
      <div className="container">
        <Header/>
        <div className="option input-field">
          <span className="all-products" onClick={() => setInputProduct(allProducts)}>
            All Products
          </span>
          <input
            type="text"
            onChange={(e) => this.setInputData(e)}
            value={inputData}
            placeholder="Filter data"
          />
          <img className="logo" src={ require("./../actions/images/search.png") } />
        </div>
        {autoCompleteItem}
        {options}
        {mainView}
        <Footer/>
      </div>
    )
  }
}

ProductDetail.defaultProps = {
  product: [],
  allProducts: []
}

ProductDetail.propTypes = {
  product: PropTypes.array.isRequired,
  allProducts: PropTypes.array.isRequired,
  fetchData: PropTypes.func,
  setInputProduct: PropTypes.func
};

const bindAction = (dispatch) => ({
    fetchData: () => dispatch(fetchProducts()),
    setInputProduct: (data) => dispatch(setSelectedProduct(data))
});

const mapStateToProps = state => ({
    product: state.ProductReducer.products,
    allProducts: state.ProductReducer.AllProducts,
});

export default connect(mapStateToProps, bindAction)(ProductDetail);
