import React, { Component } from 'react';
import LoadingOrderAnimation from 'react-loading-order-with-animation';

/* utils */
import { setParallax } from '../../../utils/parallax';

/* component styles */
import { styles } from './styles.scss';

export class TopImage extends Component {

  constructor(props) {
    super(props);
  }

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
        <LoadingOrderAnimation animation="fade-in"
          move="from-bottom-to-top"
          distance={30}
          speed={700}
          wait={700}>
        <h1 className="title">
          ketoBot
        </h1>
        </LoadingOrderAnimation>
        <LoadingOrderAnimation animation="fade-in"
          move="from-bottom-to-top"
          distance={60}
          speed={700}
          wait={900}>
          <h2>
            because machines
          </h2>
          </LoadingOrderAnimation>

        <LoadingOrderAnimation animation="fade-in"
          move="from-bottom-to-top"
          distance={100}
          speed={700}
          wait={900}>
        <div className="box1">
            <h1>I am a box</h1>
        </div>

        <div className="box1">
            <h3>I am also a box</h3>
        </div>
        </LoadingOrderAnimation>
        </section>
    );
  }
}
