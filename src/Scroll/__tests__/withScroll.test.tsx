import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { withScroll } from '../';

describe('withScroll()', () => {
  const node = document.createElement('div');

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it('receives { x, y } props', () => {
    const hello = 'hi';

    const WrappedComponent = withScroll<{ hello: string }>(
      props => expect(props).toEqual({ x: 0, y: 0, hello }) || null
    );

    ReactDOM.render(<WrappedComponent hello={hello} />, node);
  });

  it('renders elements and passes thru props', () => {
    const hello = 'hi';

    const WrappedComponent = withScroll<{ hello: string }>(props => (
      <div>
        x: {props.x}, y: {props.y} {hello}
      </div>
    ));

    ReactDOM.render(<WrappedComponent hello={hello} />, node);

    expect(node.innerHTML.includes('0')).toBe(true);
    expect(node.innerHTML.includes('hi')).toBe(true);
  });
});
