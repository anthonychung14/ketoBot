import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import LoadingOrderAnimation from 'react-loading-order-with-animation';

/* utils */
import { setParallax } from '../../utils/parallax';

import { TopImage } from '../../components/Static/TopImage'
// import { WhatItDoes } from './WhatItDoes'


export class HomePage extends Component {  
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    setParallax(this.refs.parallax, 10);
  };

    render() {    
      return (              
        <section className={`${styles}`} ref="parallax">
          <TopImage />
        </section>
    );
  }
}

