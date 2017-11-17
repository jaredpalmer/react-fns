import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Network } from '../';

describe('<Network />', () => {
  describe('<Network render />', () => {
    const node = document.createElement('div');

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(node);
    });

    it('receives { x, y } props', () => {
      ReactDOM.render(
        <Network
          render={props => expect(props).toEqual({ online: false }) || null}
        />,
        node
      );
    });

    it('renders elements', () => {
      ReactDOM.render(<Network render={() => <div>online</div>} />, node);

      expect(node.innerHTML.includes('online')).toBe(true);
    });
  });
});
