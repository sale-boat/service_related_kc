import React from 'react';
import axios from 'axios';
import Carousel from './Carousel/Carousel.jsx';
import app from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      relationship: 'Related items',
      products: [],
      pageNumber: 1,
      pages: null,
      productsPerPage: null,
    };
  }

  componentWillMount() {
    this.fetchProducts()
      .then(() => {
        this.updateWidth();
        window.addEventListener('resize', this.updateWidth.bind(this));
      });
  }

  updateWidth() {
    const width = Math.max(window.innerWidth, 1000);
    const productsPerPage = Math.floor((width - 120) / 190);
    this.setState(({ pageNumber, products }) => {
      const pages = Math.ceil(products.length / productsPerPage);
      if (pageNumber > pages) {
        return {
          productsPerPage,
          pages,
          pageNumber: pages,
        };
      }
      return {
        productsPerPage,
        pages,
      };
    });
  }
  // `http://ec2-18-217-74-134.us-east-2.compute.amazonaws.com/api/products/${productNumber || 11}`

  fetchProducts() {
    const { pathname } = window.location;
    const productNumber = parseInt(pathname.split('/')[1], 10) ? pathname.split('/')[1] : 1;
    return axios.get(`/api/related/${productNumber}`)
      .then(({ data }) => {
        this.setState({ products: data });
      })
      .catch(() => {
        this.setState({ products: [] });
      });
  }

  handleScroll(direction) {
    this.setState(({ pages, pageNumber }) => {
      if (direction === 'right') {
        if (pageNumber === pages) {
          return { pageNumber: 1 };
        }
        return { pageNumber: pageNumber + 1 };
      }
      if (pageNumber === 1) {
        return { pageNumber: pages };
      }
      return { pageNumber: pageNumber - 1 };
    });
  }

  render() {
    const {
      products, relationship, pageNumber, pages, productsPerPage,
    } = this.state;
    const firstIndex = productsPerPage * (pageNumber - 1);
    const lastIndex = productsPerPage * pageNumber;
    return (
      <section className={app.section}>
        <header className={app.header}>
          <h4 className={app.title}>
            {relationship}
          </h4>
          <h4 className={app.pages}>
            {`Page ${pageNumber} of ${pages}`}
          </h4>
        </header>
        <Carousel
          products={products
            ? products.slice(firstIndex, lastIndex)
            : []
          }
          click={this.handleClick}
          scroll={this.handleScroll}
        />
      </section>
    );
  }
}

export default App;
