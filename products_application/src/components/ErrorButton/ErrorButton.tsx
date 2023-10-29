import { Component } from 'react';

export class ErrorButton extends Component<object, { error: boolean }, string> {
  state = { error: false };

  handleClick = () => {
    this.setState({
      error: true,
    });
  };

  render() {
    if (this.state.error) {
      throw new Error('Crashing the app!');
    }
    return <button onClick={this.handleClick}>Throw Error</button>;
  }
}
