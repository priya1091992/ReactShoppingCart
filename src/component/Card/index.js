import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import './style.scss';

class Card extends Component {

  /**
  * Initialize a productFeatures function
  * to render all the features of an individual product
  */
  productFeatures (features) {
    const featureList = features ? features.map((feature, i) => {
      return (
        <li key={i}>{feature}</li>
      )
    }) : null
    return featureList
  }

  /**
  * Initialize a displayProducts function
  * to write JSX for displaying products.
  */
  displayProducts (data, i) {
    return (
      <div className="card" key={i}>
        <p>{data.itemTitle}</p>
        <img className="logo" src={ require(`./../../actions/${data.itemImage}`) } />
        <div className="rating">
          <span>
            <StarRatingComponent
              starCount={5}
              value={data.rating}
              editing={false}
              name=''
            />
          </span>
          <span className="rating-number"> ({data.rating} ratings) </span>
        </div>
        <div className="basic">
          <div> Rs.{data.price} </div>
          <div> EMI from Rs.{data.emiPrice} </div>
        </div>
        <ul className="basic feature">
          {this.productFeatures(data.features)}
        </ul>
        <input type="checkbox" value="Car" />
        <span className="add-cart"> Add to cart </span>
      </div>
    )
  }

  render () {
    let { listData, inputData, searchedData } = this.props
    let productFiletration = [...listData]

    /**
    * condition to display the product
    * based on the inout field text data
    */
    if (inputData && inputData.length >= 3) {
     productFiletration = listData.filter((data) => {
        let title = data.itemTitle.toLowerCase()
        return title.includes(inputData.toLowerCase())
      })
    }

    /**
    * switch case to filter data
    * on the basis of the selected option
    */
   switch (searchedData) {
     case 'popular':
       productFiletration = productFiletration.filter((data) => {
            return data.rating > 3.5
          })
        break
     case 'low-price':
       productFiletration = productFiletration.filter((data) => {
            return data.price <= 7500
          })
          break
     case 'high-price':
       productFiletration = productFiletration.filter((data) => {
            return data.price > 7500
          })
          break
     default: productFiletration = [...productFiletration]

   }

   const productDetails = productFiletration.map((data, i) => this.displayProducts(data,i))

    return (
      <div className="row">
        {productDetails}
      </div>
    )
  }
}

Card.defaultProps = {
  listData: [],
}

Card.propTypes = {
  listData: PropTypes.array.isRequired,
  inputData: PropTypes.string,
  searchedData: PropTypes.string,
};

export default Card
