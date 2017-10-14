import React from 'react';

export class ReducerComponent<P, S, A> extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
  }

  reducer = (state: S, action: A) => {
    console.log('No reducer implemented!');
    console.log(action);
    return state;
  };

  dispatch = (action: A) =>
    this.setState((state: S) => this.reducer(state, action));
}
