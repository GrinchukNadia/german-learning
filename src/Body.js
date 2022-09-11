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
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  handleTouchEnd(e) {
    if (!e.target.closest('.article')) {
      return;
    }

    const cardArtickel = dataNew[this.state.card][0];

    if (
      e.target.closest('.article').dataset.article === 'der' &&
      cardArtickel !== 'der' &&
      !this.state.isAnswerd
    ) {
      this.setState({ animationName: 'wrongL' });
    }
    if (
      e.target.closest('.article').dataset.article === 'der' &&
      cardArtickel === 'der'
    ) {
      this.setState({
        animationName: 'rightL',
        translation: dataNew[this.state.card][2],
        article: dataNew[this.state.card][0],
        style: 'card-correct',
        isAnswerd: true,
      });
    }

    if (
      e.target.closest('.article').dataset.article === 'die' &&
      cardArtickel !== 'die' &&
      !this.state.isAnswerd
    ) {
      this.setState({ animationName: 'wrongR' });
    }
    if (
      e.target.closest('.article').dataset.article === 'die' &&
      cardArtickel === 'die'
    ) {
      this.setState({
        animationName: 'rightR',
        translation: dataNew[this.state.card][2],
        article: dataNew[this.state.card][0],
        style: 'card-correct',
        isAnswerd: true,
      });
    }

    if (
      e.target.closest('.article').dataset.article === 'das' &&
      cardArtickel !== 'das' &&
      !this.state.isAnswerd
    ) {
      this.setState({ animationName: 'wrongT' });
    }
    if (
      e.target.closest('.article').dataset.article === 'das' &&
      cardArtickel === 'das'
    ) {
      this.setState({
        animationName: 'rightT',
        translation: dataNew[this.state.card][2],
        article: dataNew[this.state.card][0],
        style: 'card-correct',
        isAnswerd: true,
      });
    }

    if (
      e.target.closest('.article').dataset.article === 'next' &&
      this.state.isAnswerd
    ) {
      this.setState({
        animationName: 'next-card',
        isAnswerd: false,
      });
    }
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

  componentDidMount() {
    document.addEventListener('animationstart', () => {
      document.removeEventListener('keydown', this.handleKeyDown, false);
      document.removeEventListener('touchstart', this.handleTouchEnd, false);
    });

    document.addEventListener('animationend', () => {
      document.addEventListener('keydown', this.handleKeyDown, false);
      document.addEventListener('touchstart', this.handleTouchEnd, false);
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
