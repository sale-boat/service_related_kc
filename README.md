# Product Advertisement Carousels

> This service aims to clone the visual and functional style of Amazon.com's 
  product carousel modules. The key features to be created are:
  * Dynamic links to other products
  * Responsiveness to changing browser width, and mobile screens
  * Respond to button clicks to scroll through more items
  Stretch goals for this project are:
  * smooth animation on button click
  * rendering multiple kinds of carousels
  * SVG graphics for product ratings

## Related Projects

  - https://github.com/amazonians-110/add_to_cart-chris
  - https://github.com/amazonians-110/product-reviews-victor
  - https://github.com/amazonians-110/product-gallery-summary

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#Requirements)
3. [APIs](#APIs)

## Usage

> To run this code on your computer you will need to:
  1) run 'npm i' from the command line
  2) run 'npm start'
  
## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- npm 6.4.1

## APIs
#### GET Related Items
Gets related items for a specific product ID. Returns all data matching product ID.

##### Example
```js
fetch('/related/:productId')
```

##### Returns
```js
[
  {
    "id": Number,
    "product_id": Number,
    "product_name": String,
    "product_thumnail": String,
    "price": Number
  },
  ...
]
```

#### POST Related Items
Adds a related item to the database. Returns added data.

##### Example
```js
fetch('/related/', {
  method: 'POST',
  body: {
    "product_id": Number,
    "product_name": String,
    "product_thumnail": String,
    "price": Number
  },
  headers: {
    "Content-Type": "application/json"
  }
})
```

##### Returns
```js
{
  "id": Number,
  "product_id": Number,
  "product_name": String,
  "product_thumnail": String,
  "price": Number
  "success": Boolean
}
```

#### PUT Related Items
Adds a related item to the database. Body does not need to include all fields, only those that need to be updated. Returns updated data.

##### Example
```js
fetch('/related/:relatedId', {
  method: 'PUT',
  body: {
    "product_id": Number,
    "product_name": String,
    "product_thumnail": String,
    "price": Number
  },
  headers: {
    "Content-Type": "application/json"
  }
})
```

##### Returns
```js
{
  "id": Number,
  "product_id": Number,
  "product_name": String,
  "product_thumnail": String,
  "price": Number
}
```

#### DELETE Related Items
Delete a related item from the database. Returns deleted data.

##### Example
```js
fetch('/related/:relatedId', {
  method: 'DELETE'
})
```

##### Returns
```js
{
  "id": Number,
  "product_id": Number,
  "product_name": String,
  "product_thumnail": String,
  "price": Number
}
```
