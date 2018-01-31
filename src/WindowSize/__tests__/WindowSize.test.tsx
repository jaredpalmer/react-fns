import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { WindowSize } from '../WindowSize';

describe('<WindowSize />', () => {
  describe('<WindowSize render />', () => {
    const node = document.createElement('div');

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(node);
    });

    it('receives { width, height } props', () => {
      ReactDOM.render(
        <WindowSize
          render={sizeProps =>
            expect(sizeProps).toEqual({ width: 1024, height: 768 }) || null
          }
        />,
        node
      );
    });

    it('renders elements', () => {
      ReactDOM.render(
        <WindowSize
          render={sizeProps => (
            <div>
              x: {sizeProps.width}, y: {sizeProps.width}
            </div>
          )}
        />,
        node
      );

      expect(node.innerHTML.includes('1024')).toBe(true);
    });
  });
});
