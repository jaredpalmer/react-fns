import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Network } from '../';

describe('<Network />', () => {
  describe('<Network render />', () => {
    const node = document.createElement('div');

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(node);
    });

    it('receives { online } props', () => {
      ReactDOM.render(
        <Network
          render={props =>
            console.log(props) || expect(props.online).toEqual(true) || null
          }
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
