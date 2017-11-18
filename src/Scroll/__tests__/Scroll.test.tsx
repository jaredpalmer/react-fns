import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Scroll } from '../Scroll';

describe('<Scroll />', () => {
  describe('<Scroll render />', () => {
    const node = document.createElement('div');

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(node);
    });

    it('receives { x, y } props', () => {
      ReactDOM.render(
        <Scroll
          render={scrollProps =>
            expect(scrollProps).toEqual({ x: 0, y: 0 }) || null
          }
        />,
        node
      );
    });

    it('renders elements', () => {
      ReactDOM.render(
        <Scroll
          render={scrollProps => (
            <div>
              x: {scrollProps.x}, y: {scrollProps.y}
            </div>
          )}
        />,
        node
      );

      expect(node.innerHTML.includes('0')).toBe(true);
    });
  });
});
