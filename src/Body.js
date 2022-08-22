import React from 'react';
import Card from './Card';
import { data } from './data_lesson01';

const dataNew = data.sort(() => Math.random() - 0.5);

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      card: 0,
      animationName: 'tip',
      translation: '. . . . . . . .',
      article: '___',
      style: '',
      isAnswerd: false,
      xDown: null,
      yDown: null,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getTouches = this.getTouches.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    // this.handleKeyUp = this.handleKeyUp.bind(this);
    // this.handleAnyKey = this.handleAnyKey.bind(this);
  }

  handleKeyDown(e) {
    const cardArtickel = dataNew[this.state.card][0];
    if (e.keyCode === 37 && cardArtickel !== 'der' && !this.state.isAnswerd) {
      this.setState({ animationName: 'wrongL' });
    }
    if (e.keyCode === 37 && cardArtickel === 'der') {
      this.setState({
        animationName: 'rightL',
        translation: dataNew[this.state.card][2],
        article: dataNew[this.state.card][0],
        style: 'card-correct',
        isAnswerd: true,
      });
    }

    if (e.keyCode === 39 && cardArtickel !== 'die' && !this.state.isAnswerd) {
      this.setState({ animationName: 'wrongR' });
    }
    if (e.keyCode === 39 && cardArtickel === 'die') {
      this.setState({
        animationName: 'rightR',
        translation: dataNew[this.state.card][2],
        article: dataNew[this.state.card][0],
        style: 'card-correct',
        isAnswerd: true,
      });
    }

    if (e.keyCode === 38 && cardArtickel !== 'das' && !this.state.isAnswerd) {
      this.setState({ animationName: 'wrongT' });
    }
    if (e.keyCode === 38 && cardArtickel === 'das') {
      this.setState({
        animationName: 'rightT',
        translation: dataNew[this.state.card][2],
        article: dataNew[this.state.card][0],
        style: 'card-correct',
        isAnswerd: true,
      });
    }

    if (e.keyCode === 40 && this.state.isAnswerd) {
      this.setState({
        animationName: 'next-card',
        isAnswerd: false,
      });
    }
  }

  getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  handleTouchStart(evt) {
    const firstTouch = this.getTouches(evt)[0];
    this.setState({
      xDown: firstTouch.clientX,
      yDown: firstTouch.clientY,
    });
  }

  handleTouchMove(evt) {
    if (!this.state.xDown || !this.state.yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.state.xDown - xUp;
    let yDiff = this.state.yDown - yUp;
    const cardArtickel = dataNew[this.state.card][0];

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        // console.log('left swipe');
        if (cardArtickel !== 'der' && !this.state.isAnswerd) {
          this.setState({ animationName: 'wrongL' });
        }
        if (cardArtickel === 'der') {
          this.setState({
            animationName: 'rightL',
            translation: dataNew[this.state.card][2],
            article: dataNew[this.state.card][0],
            style: 'card-correct',
            isAnswerd: true,
          });
        }
      } else {
        // console.log('right swipe');
        if (cardArtickel !== 'die' && !this.state.isAnswerd) {
          this.setState({ animationName: 'wrongR' });
        }
        if (cardArtickel === 'die') {
          this.setState({
            animationName: 'rightR',
            translation: dataNew[this.state.card][2],
            article: dataNew[this.state.card][0],
            style: 'card-correct',
            isAnswerd: true,
          });
        }
      }
    } else {
      if (yDiff > 0) {
        // console.log('up swipe');
        if (cardArtickel !== 'das' && !this.state.isAnswerd) {
          this.setState({ animationName: 'wrongT' });
        }
        if (cardArtickel === 'das') {
          this.setState({
            animationName: 'rightT',
            translation: dataNew[this.state.card][2],
            article: dataNew[this.state.card][0],
            style: 'card-correct',
            isAnswerd: true,
          });
        }
      } else {
        // console.log('down swipe');
        if (this.state.isAnswerd) {
          this.setState({
            animationName: 'next-card',
            isAnswerd: false,
          });
        }
      }
    }

    /* reset values */
    this.setState({
      xDown: null,
      yDown: null,
    });
  }

  componentDidMount() {
    document.addEventListener('animationstart', () => {
      document.removeEventListener('keydown', this.handleKeyDown, false);
      document.removeEventListener('touchstart', this.handleTouchStart, false);
      document.removeEventListener('touchmove', this.handleTouchMove, false);
    });

    document.addEventListener('animationend', () => {
      document.addEventListener('keydown', this.handleKeyDown, false);
      document.addEventListener('touchstart', this.handleTouchStart, false);
      document.addEventListener('touchmove', this.handleTouchMove, false);
    });
  }

  componentDidUpdate(__, pe) {
    if (
      this.state.animationName !== pe.animationName &&
      this.state.animationName === 'next-card'
    ) {
      setTimeout(() => {
        this.setState({
          card: this.state.card + 1,
          translation: '. . . . . . . .',
          article: '___',
          style: '',
        });
      }, 250);
    }
  }

  render() {
    return (
      <div className='body'>
        <div className='container'>
          <Card
            animation={this.state.animationName}
            word={dataNew[this.state.card][1]}
            link={dataNew[this.state.card][3]}
            translation={this.state.translation}
            article={this.state.article}
            style={this.state.style}
          />
        </div>
      </div>
    );
  }
}

export default Body;
