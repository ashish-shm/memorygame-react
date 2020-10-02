import React, { Component } from 'react';
import './style.css';

class CardView extends Component {
    
    onClick= () => {
        if (!this.props.matched && !this.props.flipped) {
            this.props.onClick(this.props.id, this.props.image);
        }
    }

    render() {
        let imagePath = './images/';
        if (this.props.flipped) {
            imagePath = imagePath + this.props.image + '.jpg';
        } else {
            imagePath = imagePath + 'back.jpg';
        }

        let className = 'Card';
        if (this.props.matched) {
            className = className + ' Matched';
        }

        return (
           <div className='card'> <img className={className} src={require(`${imagePath}`)} alt='' onClick={this.onClick} /></div>
        );
    };
};

export default CardView;
