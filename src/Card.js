import React from 'react';

function Card(props) {
  const animation = { animationName: props.animation };
  return (
    <div className='card'>
      <div className='article article-der' data-article="der">
        <div className='article-arrow article-arrow-left'></div>
        <div>der</div>
      </div>
      <div className='article article-die' data-article="die">
        <div className='article-arrow article-arrow-right'></div>
        <div>die</div>
      </div>
      <div className='article article-das' data-article="das">
        <div className='article-arrow article-arrow-top'></div>
        <div>das</div>
      </div>
      <div className='article article-next' data-article="next">
        <div>nächste</div>
        <div className='article-arrow article-arrow-bottom'></div>
      </div>
      <div style={animation} className={`card-inner ${props.style}`}>
        <div className='card-inner_img'>
          <img alt='oil' src={props.link}></img>
        </div>
        <div className='card-inner_text'>
          <div>{props.article} {props.word}</div>
          <div className='card-inner_translate'>{props.translation}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
