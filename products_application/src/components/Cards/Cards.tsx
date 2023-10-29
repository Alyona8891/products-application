import { Component } from 'react';
import { Card } from './Card/Card';
import { ICard } from '../../types';

export class Cards extends Component<
  { cards: ICard[] },
  Record<string, never>
> {
  render() {
    return (
      <>
        {this.props.cards.map((card: ICard) => {
          return <Card card={card} key={card.id} />;
        })}
      </>
    );
  }
}
