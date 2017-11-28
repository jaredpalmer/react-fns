import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { withVibration } from '../';

describe('withVibration()', () => {
  const node = document.createElement('div');

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it('receives { vibrate, persistentVibrate, cancelVibrate } props', () => {
    const hello = 'hi';

    const WrappedComponent = withVibration<{ hello: string }>(props => {
      expect(props.vibrate).toBeInstanceOf(Function);
      expect(props.persistentVibrate).toBeInstanceOf(Function);
      expect(props.cancelVibrations).toBeInstanceOf(Function);
      expect(props.hello).toEqual(hello);
      return null;
    });

    ReactDOM.render(<WrappedComponent hello={hello} />, node);
  });

  it('renders elements and passes thru props', () => {
    const hello = 'hi';

    const WrappedComponent = withVibration<{ hello: string }>(props => (
      <div>
        {hello}
        <button onClick={() => props.vibrate(1)}>vibrate</button>
        <button onClick={() => props.cancelVibrations()}>cancel</button>
        <button onClick={() => props.persistentVibrate(1, 100)}>
          persistent
        </button>
      </div>
    ));

    ReactDOM.render(<WrappedComponent hello={hello} />, node);

    expect(node.innerHTML.includes('hi')).toBe(true);
  });
});
