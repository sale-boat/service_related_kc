# Product Advertisement Carousels

## Table of Contents

1. [Key Features](#Key-Features)
2. [Related](#Related-Projects)
3. [Usage](#Usage)
4. [Requirements](#Requirements)
5. [APIs](#APIs)

## Key Features
  * Dynamic links to other products
  * Responsiveness to changing browser width, and mobile screens
  * Respond to button clicks to scroll through more items
  Stretch goals for this project are:
  * smooth animation on button click
  * rendering multiple kinds of carousels
  * SVG graphics for product ratings

## Related Projects

  - [Photos](https://github.com/sale-boat/service_photos_mh)
  - [Cart](https://github.com/sale-boat/service_cart_ls)
  - [Reviews](https://github.com/sale-boat/service_reviews_lh)
  - [Proxy](https://github.com/sale-boat/proxy_kc)


## Usage

> To run this code on your computer you will need to:
  1) run 'npm i' from the command line
  2) run 'npm start'
  
## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- npm 6.4.1

## Seeding Data

Use 'npm run seed-postgres' to seed data into postgres

## APIs

#### GET Related Items
Gets related items for a specific product ID. Returns all data matching product ID.

##### GET Example
```js
fetch('/related/:productId')
```
Where `:productId` represents the ID of the product page currently loaded.

##### GET Returns
```js
[
  {
    "id": 301,
    "source_product_id": 12,
    "product_id": 1,
    "product_name": "Carlie Cute Cat Glass Cup Tea Mug",
    "product_thumbnail": "https://images-na.ssl-images-amazon.com/images/I/51KZpKpdBwL._AC_UL160_SR160,160_.jpg",
    "product_rating": 4.5,
    "product_rating_count": 1234
    "price": 1199
  },
  ...
]
```

###### GET Return Properties
Key|Type|Description
---|:---:|---
id|`Number`|ID of the Product <-> Related relationship.
source_product_id|`Number`|Product ID of source product (:productId).
product_id|`Number`|Product ID of related product.
product_name|`String`|Name of related product.
product_thumbnail|`String`|URL of the related product image.
product_rating|`Number`|The rating of related product.
product_rating_count|`Number`|The number of ratings of related product.
price|`Number`|Price of related product (in cents).

#### POST Related Items
Adds a related item to the database. Returns added data.

##### POST Example
```js
fetch('/related/', {
  method: 'POST',
  body: {
    "source_product_id": 12,
    "product_id": 1
  },
  headers: {
    "Content-Type": "application/json"
  }
})
```

###### POST Example Properties
Key|Type|Description
---|:---:|---
source_product_id|`Number`|Product ID of source product (:productId).
product_id|`Number`|Product ID of related product.

##### POST Returns
```js
{
  "id": 301,
  "source_product_id": 12,
  "product_id": 1,
  "product_name": "Carlie Cute Cat Glass Cup Tea Mug",
  "product_thumbnail": "https://images-na.ssl-images-amazon.com/images/I/51KZpKpdBwL._AC_UL160_SR160,160_.jpg",    "product_rating": 4.5,
  "product_rating_count": 1234
  "price": 1199
}
```

###### POST Return Properties
Key|Type|Description
---|:---:|---
id|`Number`|ID of the Product <-> Related relationship.
source_product_id|`Number`|Product ID of source product.
product_id|`Number`|Product ID of related product.
product_name|`String`|Name of related product.
product_thumbnail|`String`|URL of the related product image.
product_rating|`Number`|The rating of related product.
product_rating_count|`Number`|The number of ratings of related product.
price|`Number`|Price of related product (in cents).

#### PUT Related Items
Adds a related item to the database. Body does not need to include all fields, only those that need to be updated. Returns updated data.

##### PUT Example
```js
fetch('/related/:relatedId', {
  method: 'PUT',
  body: {
    "source_product_id": 12,
    "product_id": 1
  },
  headers: {
    "Content-Type": "application/json"
  }
})
```
Where `:relatedId` represents the ID of the Product <-> Related relationship.

###### PUT Example Properties
Key|Type|Description
---|:---:|---
source_product_id|`Number`|Product ID of source product.
product_id|`Number`|Product ID of related product.

##### PUT Returns
```js
{
  "id": 301,
  "source_product_id": 12,
  "product_id": 1,
  "product_name": "Carlie Cute Cat Glass Cup Tea Mug",
  "product_thumbnail": "https://images-na.ssl-images-amazon.com/images/I/51KZpKpdBwL._AC_UL160_SR160,160_.jpg",
  "product_rating": 4.5,
  "product_rating_count": 1234
  "price": 1199
}
```

###### PUT Return Properties
Key|Type|Description
---|:---:|---
id|`Number`|ID of the Product <-> Related relationship.
source_product_id|`Number`|Product ID of source product.
product_id|`Number`|Product ID of related product.
product_name|`String`|Name of related product.
product_thumbnail|`String`|URL of the related product image.
product_rating|`Number`|The rating of related product.
product_rating_count|`Number`|The number of ratings of related product.
price|`Number`|Price of related product (in cents).

#### DELETE Related Items
Delete a related item from the database. Returns deleted data.

##### DELETE Example
```js
fetch('/related/:relatedId', {
  method: 'DELETE'
})
```
Where `:relatedId` represents the ID of the Product <-> Related relationship.

##### DELETE Returns
```js
{
  "id": 301,
  "source_product_id": 12,
  "product_id": 1,
  "product_name": "Carlie Cute Cat Glass Cup Tea Mug",
  "product_thumbnail": "https://images-na.ssl-images-amazon.com/images/I/51KZpKpdBwL._AC_UL160_SR160,160_.jpg",
  "product_rating": 4.5,
  "product_rating_count": 1234
  "price": 1199
}
```

###### DELETE Return Properties
Key|Type|Description
---|:---:|---
id|`Number`|ID of the Product <-> Related relationship.
source_product_id|`Number`|Product ID of source product.
product_id|`Number`|Product ID of related product.
product_name|`String`|Name of related product.
product_thumbnail|`String`|URL of the related product image.
product_rating|`Number`|The rating of related product.
product_rating_count|`Number`|The number of ratings of related product.
price|`Number`|Price of related product (in cents).
