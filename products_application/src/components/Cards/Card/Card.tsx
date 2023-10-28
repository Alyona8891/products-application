import { Component } from 'react';
import styles from './Card.module.scss';
import { ICard } from '../../../types';

export class Card extends Component<{ card: ICard }, Record<string, never>> {
  render() {
    return (
      <div className={styles.card}>
        <img
          className={styles.image}
          src={this.props.card.images[0]}
          alt="card image"
        />
        <h3 className={styles.title}>{this.props.card.title}</h3>
        <p className={styles.text}>{this.props.card.description}</p>
      </div>
    );
  }
}
