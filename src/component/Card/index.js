import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import './style.scss';

class Card extends Component {
  productFeatures (features) {
    const featureList = features ? features.map((feature, i) => {
      return (
        <li key={i}>{feature}</li>
      )
    }) : null
    return featureList
  }

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
    if (inputData && inputData.length >= 3) {
     productFiletration = listData.filter((data) => {
        let title = data.itemTitle.toLowerCase()
        return title.includes(inputData.toLowerCase())
      })
    }

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

export default Card
