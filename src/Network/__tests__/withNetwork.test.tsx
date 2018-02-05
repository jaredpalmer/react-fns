import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { withNetwork } from '../';

describe('withNetwork()', () => {
  const node = document.createElement('div');

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it('receives { online } props', () => {
    const hello = 'hi';

    const WrappedComponent = withNetwork<{ hello: string }>(
      props => expect(props.online).toEqual(true) || null
    );

    ReactDOM.render(<WrappedComponent hello={hello} />, node);
  });

  // it('renders elements and passes thru props', () => {
  //   const hello = 'hi';

  //   const WrappedComponent = withNetwork<{ hello: string }>(props => (
  //     <div>
  //       x: {props.x}, y: {props.y} {hello}
  //     </div>
  //   ));

  //   ReactDOM.render(<WrappedComponent hello={hello} />, node);

  //   expect(node.innerHTML.includes('0')).toBe(true);
  //   expect(node.innerHTML.includes('hi')).toBe(true);
  // });
});
