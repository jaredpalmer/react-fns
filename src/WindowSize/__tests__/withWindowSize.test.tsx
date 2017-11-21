import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { withWindowSize } from '../withWindowSize';

describe('withScroll()', () => {
  const node = document.createElement('div');

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it('receives { width, height } props', () => {
    const hello = 'hi';

    const WrappedComponent = withWindowSize<{ hello: string }>(
      props => expect(props).toEqual({ width: 0, height: 0, hello }) || null
    );

    ReactDOM.render(<WrappedComponent hello={hello} />, node);
  });

  it('renders elements and passes thru props', () => {
    const hello = 'hi';

    const WrappedComponent = withWindowSize<{ hello: string }>(props => (
      <div>
        x: {props.height}, y: {props.width} {hello}
      </div>
    ));

    ReactDOM.render(<WrappedComponent hello={hello} />, node);

    expect(node.innerHTML.includes('0')).toBe(true);
    expect(node.innerHTML.includes('hi')).toBe(true);
  });
});
